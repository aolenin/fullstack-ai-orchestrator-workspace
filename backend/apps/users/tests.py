import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient

User = get_user_model()

REGISTER_URL = "/api/auth/register/"
LOGIN_URL = "/api/auth/login/"
REFRESH_URL = "/api/auth/token/refresh/"
LOGOUT_URL = "/api/auth/logout/"
ME_URL = "/api/auth/me/"

pytestmark = pytest.mark.django_db


@pytest.fixture
def client():
    return APIClient()


@pytest.fixture
def user_payload():
    return {
        "username": "testuser",
        "email": "test@netevia.com",
        "password": "SecurePass1!",
        "password2": "SecurePass1!",
        "first_name": "Test",
        "last_name": "User",
    }


@pytest.fixture
def created_user(user_payload):
    return User.objects.create_user(
        username=user_payload["username"],
        email=user_payload["email"],
        password=user_payload["password"],
        first_name=user_payload["first_name"],
        last_name=user_payload["last_name"],
    )


@pytest.fixture
def auth_client(client, created_user):
    client.force_authenticate(user=created_user)
    return client


# ── Registration ──────────────────────────────────────────────────────────────

class TestRegistration:
    def test_register_returns_201_and_tokens(self, client, user_payload):
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 201
        assert "access" in res.data
        assert "refresh" in res.data
        assert "user" in res.data

    def test_register_user_fields_correct(self, client, user_payload):
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.data["user"]["username"] == user_payload["username"]
        assert res.data["user"]["email"] == user_payload["email"]

    def test_register_password_not_in_response(self, client, user_payload):
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert "password" not in res.data.get("user", {})

    def test_register_user_persisted_in_db(self, client, user_payload):
        client.post(REGISTER_URL, user_payload, format="json")
        assert User.objects.filter(username=user_payload["username"]).exists()

    def test_register_password_is_hashed(self, client, user_payload):
        client.post(REGISTER_URL, user_payload, format="json")
        user = User.objects.get(username=user_payload["username"])
        assert user.check_password(user_payload["password"])
        assert user.password != user_payload["password"]

    def test_register_tokens_are_usable(self, client, user_payload):
        reg = client.post(REGISTER_URL, user_payload, format="json")
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {reg.data["access"]}')
        assert client.get(ME_URL).status_code == 200

    def test_register_password_mismatch_returns_400(self, client, user_payload):
        user_payload["password2"] = "different123"
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 400

    def test_register_short_password_returns_400(self, client, user_payload):
        user_payload["password"] = user_payload["password2"] = "ab1"
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 400

    def test_register_duplicate_username_returns_400(self, client, user_payload, created_user):
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 400

    def test_register_duplicate_email_returns_400(self, client, user_payload, created_user):
        user_payload["username"] = "other_user"
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 400

    def test_register_missing_email_returns_400(self, client, user_payload):
        del user_payload["email"]
        res = client.post(REGISTER_URL, user_payload, format="json")
        assert res.status_code == 400

    def test_register_empty_body_returns_400(self, client):
        res = client.post(REGISTER_URL, {}, format="json")
        assert res.status_code == 400

    def test_register_get_not_allowed(self, client):
        res = client.get(REGISTER_URL)
        assert res.status_code == 405


# ── Login ─────────────────────────────────────────────────────────────────────

class TestLogin:
    def test_login_returns_tokens(self, client, created_user, user_payload):
        res = client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json")
        assert res.status_code == 200
        assert "access" in res.data
        assert "refresh" in res.data

    def test_login_wrong_password_returns_401(self, client, created_user, user_payload):
        res = client.post(LOGIN_URL, {"username": user_payload["username"], "password": "wrong"}, format="json")
        assert res.status_code == 401

    def test_login_unknown_username_returns_401(self, client):
        res = client.post(LOGIN_URL, {"username": "nobody", "password": "pass"}, format="json")
        assert res.status_code == 401

    def test_login_missing_fields_returns_400(self, client):
        res = client.post(LOGIN_URL, {"username": "only"}, format="json")
        assert res.status_code == 400

    def test_login_empty_body_returns_400(self, client):
        res = client.post(LOGIN_URL, {}, format="json")
        assert res.status_code == 400

    def test_login_inactive_user_returns_401(self, client, created_user, user_payload):
        created_user.is_active = False
        created_user.save()
        res = client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json")
        assert res.status_code == 401

    def test_login_get_not_allowed(self, client):
        res = client.get(LOGIN_URL)
        assert res.status_code == 405


# ── Profile /me/ ──────────────────────────────────────────────────────────────

class TestProfile:
    def test_me_authenticated_returns_200(self, auth_client):
        assert auth_client.get(ME_URL).status_code == 200

    def test_me_returns_correct_user(self, auth_client, created_user):
        res = auth_client.get(ME_URL)
        assert res.data["username"] == created_user.username
        assert res.data["email"] == created_user.email

    def test_me_password_not_exposed(self, auth_client):
        assert "password" not in auth_client.get(ME_URL).data

    def test_me_no_token_returns_401(self, client):
        assert client.get(ME_URL).status_code == 401

    def test_me_malformed_token_returns_401(self, client):
        client.credentials(HTTP_AUTHORIZATION="Bearer not.a.valid.token")
        assert client.get(ME_URL).status_code == 401

    def test_me_missing_bearer_prefix_returns_401(self, client, created_user, user_payload):
        login = client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json")
        client.credentials(HTTP_AUTHORIZATION=login.data["access"])
        assert client.get(ME_URL).status_code == 401

    def test_me_post_not_allowed(self, auth_client):
        assert auth_client.post(ME_URL, {}).status_code == 405


# ── Token refresh ─────────────────────────────────────────────────────────────

class TestTokenRefresh:
    def _login(self, client, user_payload):
        return client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json").data

    def test_refresh_returns_new_access_token(self, client, created_user, user_payload):
        tokens = self._login(client, user_payload)
        res = client.post(REFRESH_URL, {"refresh": tokens["refresh"]}, format="json")
        assert res.status_code == 200
        assert "access" in res.data

    def test_refresh_new_token_is_usable(self, client, created_user, user_payload):
        tokens = self._login(client, user_payload)
        new = client.post(REFRESH_URL, {"refresh": tokens["refresh"]}, format="json").data
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {new["access"]}')
        assert client.get(ME_URL).status_code == 200

    def test_refresh_invalid_token_returns_401(self, client):
        assert client.post(REFRESH_URL, {"refresh": "invalid"}, format="json").status_code == 401

    def test_refresh_empty_body_returns_400(self, client):
        assert client.post(REFRESH_URL, {}, format="json").status_code == 400

    def test_refresh_get_not_allowed(self, client):
        assert client.get(REFRESH_URL).status_code == 405


# ── Logout ────────────────────────────────────────────────────────────────────

class TestLogout:
    def _login(self, client, user_payload):
        return client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json").data

    def test_logout_success(self, client, created_user, user_payload):
        tokens = self._login(client, user_payload)
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
        assert client.post(LOGOUT_URL, {"refresh": tokens["refresh"]}, format="json").status_code == 205

    def test_logout_without_auth_returns_401(self, client, created_user, user_payload):
        tokens = self._login(client, user_payload)
        assert client.post(LOGOUT_URL, {"refresh": tokens["refresh"]}, format="json").status_code == 401

    def test_logout_missing_refresh_returns_400(self, auth_client):
        assert auth_client.post(LOGOUT_URL, {}, format="json").status_code == 400

    def test_logout_invalid_refresh_returns_400(self, auth_client):
        assert auth_client.post(LOGOUT_URL, {"refresh": "invalid"}, format="json").status_code == 400


# ── Integration ───────────────────────────────────────────────────────────────

class TestIntegration:
    def test_register_then_access_me(self, client, user_payload):
        reg = client.post(REGISTER_URL, user_payload, format="json")
        assert reg.status_code == 201
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {reg.data["access"]}')
        assert client.get(ME_URL).status_code == 200

    def test_login_refresh_then_access_me(self, client, created_user, user_payload):
        tokens = client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json").data
        new = client.post(REFRESH_URL, {"refresh": tokens["refresh"]}, format="json").data
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {new["access"]}')
        assert client.get(ME_URL).status_code == 200

    def test_after_logout_refresh_token_is_blacklisted(self, client, created_user, user_payload):
        tokens = client.post(LOGIN_URL, {"username": user_payload["username"], "password": user_payload["password"]}, format="json").data
        client.credentials(HTTP_AUTHORIZATION=f'Bearer {tokens["access"]}')
        client.post(LOGOUT_URL, {"refresh": tokens["refresh"]}, format="json")
        assert client.post(REFRESH_URL, {"refresh": tokens["refresh"]}, format="json").status_code == 401

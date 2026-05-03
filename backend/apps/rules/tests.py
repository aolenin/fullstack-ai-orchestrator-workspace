import pytest
from .services import evaluate

@pytest.mark.parametrize("field,value,code", [
    ("bin_count_10m", 4, "duplicate_bin"),
    ("auth_capture_gap_hours", 73, "auth_capture_gap"),
    ("duplicate_auth_count_1h", 3, "duplicate_auths"),
    ("velocity_pct_of_30d_avg", 201, "high_velocity"),
])
def test_critical_rules_trigger(field, value, code):
    results = evaluate({field: value})
    result = next(r for r in results if r["code"] == code)
    assert result["triggered"] is True

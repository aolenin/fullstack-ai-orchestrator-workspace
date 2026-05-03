from dataclasses import dataclass
from typing import Any

@dataclass(frozen=True)
class RuleResult:
    code: str
    name: str
    severity: str
    triggered: bool
    reason: str

DEFAULT_RULES = [
    {"code": "duplicate_bin", "name": "Duplicate BIN", "severity": "critical", "trigger": "same BIN >3x in 10 min"},
    {"code": "auth_capture_gap", "name": "Auth/Capture Gap", "severity": "critical", "trigger": ">72h gap or >15% variance"},
    {"code": "duplicate_auths", "name": "Duplicate Auths", "severity": "critical", "trigger": "same amount/card >2x/hour"},
    {"code": "high_velocity", "name": "High Velocity", "severity": "critical", "trigger": ">200% of 30-day avg in 24h"},
]

def catalog() -> list[dict[str, Any]]:
    return DEFAULT_RULES

def evaluate(payload: dict[str, Any]) -> list[dict[str, Any]]:
    results: list[RuleResult] = []
    bin_count = int(payload.get("bin_count_10m", 0))
    auth_capture_hours = float(payload.get("auth_capture_gap_hours", 0))
    capture_variance_pct = float(payload.get("capture_variance_pct", 0))
    duplicate_auth_count = int(payload.get("duplicate_auth_count_1h", 0))
    velocity_pct_of_avg = float(payload.get("velocity_pct_of_30d_avg", 0))

    results.append(RuleResult("duplicate_bin", "Duplicate BIN", "critical", bin_count > 3, f"bin_count_10m={bin_count}"))
    results.append(RuleResult("auth_capture_gap", "Auth/Capture Gap", "critical", auth_capture_hours > 72 or capture_variance_pct > 15, f"gap_hours={auth_capture_hours}, variance_pct={capture_variance_pct}"))
    results.append(RuleResult("duplicate_auths", "Duplicate Auths", "critical", duplicate_auth_count > 2, f"duplicate_auth_count_1h={duplicate_auth_count}"))
    results.append(RuleResult("high_velocity", "High Velocity", "critical", velocity_pct_of_avg > 200, f"velocity_pct_of_30d_avg={velocity_pct_of_avg}"))
    return [r.__dict__ for r in results]

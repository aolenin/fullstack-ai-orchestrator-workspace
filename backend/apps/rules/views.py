from rest_framework.decorators import api_view
from rest_framework.response import Response
from .services import catalog, evaluate

@api_view(["GET"])
def rule_catalog(request):
    return Response({"rules": catalog()})

@api_view(["POST"])
def evaluate_rules(request):
    results = evaluate(request.data or {})
    return Response({"results": results, "triggered_count": sum(1 for r in results if r["triggered"])})

from django.urls import path
from .views import rule_catalog, evaluate_rules
urlpatterns = [path('catalog/', rule_catalog), path('evaluate/', evaluate_rules)]

from django.contrib import admin
from django.urls import path
from django.http import JsonResponse

# Health check view
def health(request):
    return JsonResponse({"status": "working"})

urlpatterns = [
    path("admin/", admin.site.urls),
    path("health", health),
]
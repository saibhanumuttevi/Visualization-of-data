from django.urls import path
from . import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('',views.upload,name="upload"),
    path('visualization/',views.visualization,name="visualization"),
    path('filters/',views.filter,name="filters"),   
]

if settings.DEBUG:
   urlpatterns == static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
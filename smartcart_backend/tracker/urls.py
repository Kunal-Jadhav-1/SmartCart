
from django.urls import path
from . import views

urlpatterns = [
    path('track-product/', views.track_product, name='track_product'),
    path('amazon/', views.amazon_scraper, name='amazon_scraper'),
    path('flipkart/', views.flipkart_scraper, name='flipkart_scraper'),
    path('myntra/', views.myntra_scraper, name='myntra_scraper'),
    path('test-email/', views.test_email, name='test_email'),
    path('price-history/<int:product_id>/', views.get_price_history, name = 'get_price_history'),
]

from django.contrib import admin
from .models import Product, PriceHistory, Notification

admin.site.register(Product)
admin.site.register(PriceHistory)
admin.site.register(Notification)

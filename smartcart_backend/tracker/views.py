from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from tracker.models import Product, PriceHistory, Notification,User
from tracker.utils.scraper import scrape_amazon, scrape_flipkart, scrape_myntra
from django.core.mail import send_mail
from django.conf import settings





@api_view(['GET'])
def test_email(request):
    try:
        send_mail(
            'SmartCart Email Test',
            'This is a test email from your Django project.',
            settings.EMAIL_HOST_USER,
            ['jskunal.01@gmail.com'],
            fail_silently=False,
        )
        return Response({'status': 'Email sent successfully!'})
    except Exception as e:
        return Response({'error': str(e)}, status=500)


@api_view(['GET'])
def get_price_history(request, product_id):
    try:
        product = Product.objects.get(id=product_id)
        history = PriceHistory.objects.filter(product=product).order_by('checked_at')

        data = [
            {
                "price": entry.price,
                "timestamp": entry.checked_at.strftime("%Y-%m-%d %H:%M")
            }
            for entry in history
        ]
        return Response(data)

    except Product.DoesNotExist:
        return Response({"error": "Product not found"}, status=404)
    except Exception as e:
        print(f"Error: {str(e)}")  # Log any other error
        return Response({"error": "Something went wrong."}, status=500)



@api_view(['POST'])
def track_product(request):
    try:
        print("Received data:", request.data)

        user_email = request.data.get('user_email')
        name = request.data.get('product_name')
        current_price = float(request.data.get('price'))
        image_url = request.data.get('image')
        url = request.data.get('url')
        site = request.data.get('site')
        target_price = float(request.data.get('target_price', current_price))

        if not all([user_email, name, current_price, image_url, url, site]):
            return Response({"error": "Missing required fields."}, status=400)

        user = User.objects.filter(email=user_email).first()
        if not user:
            return Response({"error": "User not found."}, status=404)

        product, created = Product.objects.get_or_create(
            user=user,
            url=url,
            defaults={
                'name': name,
                'current_price': current_price,
                'target_price': target_price,
                'site': site,
                'image': image_url,
            }
        )

        if not created and product.current_price != current_price:
            product.current_price = current_price
            product.save()

        # Log price history
        PriceHistory.objects.create(product=product, price=current_price)

        # Notify if price drops
        if current_price <= product.target_price:
            Notification.objects.create(
                user=user,
                product=product,
                message=f"Price dropped for {product.name}! Current: ₹{current_price}, Target: ₹{product.target_price}"
            )

        return Response({
            "product_id": product.id,
            "user_id": user.id,
            "product_name": product.name,
            "price": product.current_price,
            "image": product.image,
            "url": product.url,
            "site": product.site,
            "tracked": True,
            "created_new": created
        })

    except Exception as e:
        print("track_product error:", str(e))
        return Response({"error": str(e)}, status=500)



def clean_price(price_str):
    
    cleaned_price = ''
    
    # Iterate through each character in the price string
    for char in price_str:
        # Only keep digits or decimal points
        if char.isdigit() or char == '.':
            cleaned_price += char
    
    # Convert to float and handle cases where the cleaned string is empty or invalid
    try:
        return float(cleaned_price) if cleaned_price else None
    except ValueError:
        return None

# Example in the scraper functions:

@api_view(['POST'])
def amazon_scraper(request):
    url = request.data.get('url')
    name, price, image_url = scrape_amazon(url)

    # Clean and convert price to float
    price = clean_price(price)

    if price is None:
        return Response({"error": "Invalid price format"}, status=400)

    return Response({
        "product_name": name,
        "price": price,
        "image": image_url,
        "url": url,
        "site": "Amazon"
    })


@api_view(['POST'])
def flipkart_scraper(request):
    url = request.data.get('url')
    name, price, image_url = scrape_flipkart(url)

    # Clean and convert price to float
    price = clean_price(price)

    if price is None:
        return Response({"error": "Invalid price format"}, status=400)

    return Response({
        "product_name": name,
        "price": price,
        "image": image_url,
        "url": url,
        "site": "Flipkart"
    })


@api_view(['POST'])
def myntra_scraper(request):
    url = request.data.get('url')
    name, price, image_url = scrape_myntra(url)

    # Clean and convert price to float
    price = clean_price(price)

    if price is None:
        return Response({"error": "Invalid price format"}, status=400)

    return Response({
        "product_name": name,
        "price": price,
        "image": image_url,
        "url": url,
        "site": "Myntra"
    })
// cart.page.ts

import { CUSTOM_ELEMENTS_SCHEMA, Component} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-cart',
  templateUrl: 'cart.page.html',
  styleUrls: ['cart.page.scss'],
})
export class CartPage{

  
  items = [
    { title: 'Bordeaux', price: 1500, imageUrl: 'https://drinkavaline.com/cdn/shop/files/Hero1_f82058aa-abd5-48a0-8dd5-cf9edf288c41_1500x.jpg?v=1693062977' },
    { title: 'Avaline', price: 1975, imageUrl: 'https://s.hdnux.com/photos/01/13/06/33/19687119/6/1200x0.jpg' },
    { title: 'Chardonnay', price: 2995, imageUrl: 'https://www.premierestateswine.co.uk/cdn/shop/products/Pinot-Grigio-Delle-Venezie_053f89e2-4a41-4c26-bbfb-d9f859b9a608_1024x1024.jpg?v=1631891813' },
    { title: 'Sauvignon', price: 2750, imageUrl: 'https://target.scene7.com/is/image/Target/GUEST_192fa626-9cdc-4973-b64b-e0531a26203d?wid=488&hei=488&fmt=pjpeg' },
    { title: 'Burgundy', price: 2843, imageUrl: 'https://i0.wp.com/mockupfree.net/wp-content/uploads/2023/10/02-9-scaled.jpg?ssl=1' },
    { title: 'Pinotage', price: 3995, imageUrl: 'https://marksandspencer.com.ph/cdn/shop/products/M_S_20final_2001457.jpg?v=1588831405' },
    { title: 'Beaujolais', price: 4063, imageUrl: 'https://marksandspencer.com.ph/cdn/shop/products/M_S_20final_2001365_1200x.jpg?v=1588831251' },
    { title: 'Torrontes', price: 5995, imageUrl: 'https://www.winerepublic.com.au/cdn/shop/files/CatenaAlamosTorrontes.jpg?v=1694935692' },
    { title: 'Grigorio', price: 6720, imageUrl: 'https://yi-files.s3.eu-west-1.amazonaws.com/products/1137000/1137625/1906766-cover.jpg' },
    { title: 'Chianti', price: 9010, imageUrl: 'https://www.campbellswines.com.au/wp-content/uploads/2023/05/image.png' },
    // Add other items here...
  ];

  cartItems: any[] = [];
  cartVisible = true;

  constructor(public alertController: AlertController, private cdr: ChangeDetectorRef) {}

  addToCart(item: any) {
    const existingItem = this.cartItems.find((cartItem) => cartItem.title === item.title);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      const newItem = { ...item, quantity: 1 };
      this.cartItems.push(newItem);
    }

    this.presentAlert('Added to cart!', `${item.title} was added to cart.`);
  }

  decrementQuantity(cartItem: any) {
    console.log('decrementQuantity() called');
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      this.calculateTotal(); // Trigger change detection
      this.cdr.detectChanges();
    }
  }
  
  incrementQuantity(cartItem: any) {
    console.log('incrementQuantity() called');
    cartItem.quantity++;
    this.calculateTotal(); // Trigger change detection
    this.cdr.detectChanges();
  }

  // ... (existing code)

  toggleCart() {
    this.cartVisible = !this.cartVisible;
  }

  removeFromCart(cartItem: any) {
    const index = this.cartItems.indexOf(cartItem);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.presentAlert('Removed from cart!', `${cartItem.title} was removed from cart.`);
    }
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  calculateTotal(): number {
    console.log('calculateTotal() called');
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  checkout() {
    this.presentAlert('Purchase made!', `Thanks for your purchase. Total: ${this.calculateTotal()}`);
    this.cartItems = [];
    this.cartVisible = false;
  }
}



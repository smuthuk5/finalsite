# PSM Lawn & Garden Equipment - Static Website

This is a simple, responsive static website for PSM Lawn & Garden Equipment with the following pages:

- Home: `index.html`
- Products listing: `products.html`
- Contact page: `contact.html`
- Product details:
  - `product-brushcutter-4s.html`
  - `product-brushcutter-2s.html`
  - `product-hedgetrimmer-psm-ht.html`
  - `product-chainsaw-psm-kawasaqi.html`
  - `product-tiller-psm-ppt.html`

## Run locally

Simply open `index.html` in a web browser. No server is required.

On macOS:

```bash
open index.html
```

## Editing prices

Each product page contains two placeholders:

- “Price without warranty: —”
- “Price with warranty: —”

To update, open the corresponding product HTML and replace the `—` with your actual amounts (e.g., `₹12,499`).

You can also mirror these values on `products.html` in the card “price-row” for consistency.

## Adding product images

- Replace any `.placeholder` blocks with actual images by inserting an `<img>` tag within those containers.
  Example:
  ```html
  <div class="product-media">
    <img src="assets/brushcutter-4s.jpg" alt="Brush cutter - 4 stroke" />
  </div>
  ```
- Keep images around 1200px width for hero/product headers; cards can use ~600px.

## Styling / Customization

- Global styles live in `css/styles.css`
- Navigation and footer are shared across all pages
- Basic mobile menu toggling and contact form validation are in `js/script.js`

## Contact form

The contact form is client-only with simple validation and a confirmation alert. To enable real submissions, hook the form to a backend or a service like Formspree, Netlify Forms, etc.

## Notes

- All pages are static and SEO-friendly.
- The site is responsive and works on mobile and desktop.



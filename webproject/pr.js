let cart = []; // πίνακας αντικειμένων: { name, price, qty }

const counterDisplay = document.getElementById("counter");
const cartItemsEl = document.getElementById("cart-items");
const totalEl = document.getElementById("total");

// Γενική συνάρτηση προσθήκης (χρησιμοποιείται από τα onclick στο HTML)
function addToCart(name, price) {

    // βεβαιώσου ότι price είναι αριθμός
  price = parseFloat(price);

  // βρίσκουμε αν υπάρχει ήδη το προϊόν
  const existing = cart.find(it => it.name === name);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ name: name, price: price, qty: 1 });
  }

  updateCounterAndDisplay();
}

// Ενημέρωση του counter και της εμφάνισης καλαθιού
function updateCounterAndDisplay() {

    // counter = συνολικός αριθμός τεμαχίων
  const counter = cart.reduce((acc, it) => acc + it.qty, 0);
  counterDisplay.textContent = counter;

  // εμφάνιση λίστας προϊόντων με qty και τιμές
  cartItemsEl.innerHTML = ""; // καθάρισμα
  let sum = 0;
  
  cart.forEach(item => {
    const itemTotal = item.price * item.qty;
    const li = document.createElement("li");
  
    li.innerHTML = `
      <strong>${item.name}</strong> x${item.qty} — ${itemTotal.toFixed(2)}€
      <button class="dec" data-name="${item.name}">−</button>
      <button class="inc" data-name="${item.name}">+</button>
      <button class="remove" data-name="${item.name}">✕</button>
    `;
    cartItemsEl.appendChild(li);
    sum += itemTotal;
  });
  totalEl.textContent = "Σύνολο: " + sum.toFixed(2) + "€";

  // συνδέουμε τα κουμπιά +/-/remove (με event listeners)
  cartItemsEl.querySelectorAll(".inc").forEach(b => {
    b.addEventListener("click", () => {
      const name = b.getAttribute("data-name");
      const it = cart.find(x => x.name === name);
      if (it) { it.qty += 1; updateCounterAndDisplay(); }
    });
  });
  cartItemsEl.querySelectorAll(".dec").forEach(b => {
    b.addEventListener("click", () => {
      const name = b.getAttribute("data-name");
      const it = cart.find(x => x.name === name);
      if (it) {
        it.qty -= 1;
        if (it.qty <= 0) cart = cart.filter(x => x.name !== name);
        updateCounterAndDisplay();
      }
    });
  });
  cartItemsEl.querySelectorAll(".remove").forEach(b => {
    b.addEventListener("click", () => {
      const name = b.getAttribute("data-name");
      cart = cart.filter(x => x.name !== name);
      updateCounterAndDisplay();
    });
  });
}

// Άδειασμα καλαθιού
function clearCart() {
  cart = [];
  updateCounterAndDisplay();
}

// Checkout: ανοίγει mail με την παραγγελία
function checkout() {
  if (cart.length === 0) {
    alert("Το καλάθι σας είναι άδειο!");
    return;
  }
  let body = "Παραγγελία:%0D%0A";
  let sum = 0;
  cart.forEach(it => {
    body += `${it.name} x${it.qty} - ${(it.price * it.qty).toFixed(2)}€%0D%0A`;
    sum += it.price * it.qty;
  });
  body += `%0D%0AΣύνολο: ${sum.toFixed(2)}€`;
  window.location.href = `mailto:leuteristhomas@gmail.com?subject=Παραγγελία&body=${body}`;

}
// αρχική εμφάνιση (σε περίπτωση που υπάρχει περιεχόμενο από πριν)
updateCounterAndDisplay();

function myFunction()
{
    const visabtn = document.getElementById("visabtn");
    const masterbtn = document.getElementById("masterbtn");
    const paypalbtn = document.getElementById("paypalbtn");
    const mysubmit = document.getElementById("mysubmit");
    const payresult = document.getElementById("payresult");

    mysubmit.onclick=function() {
        if (visabtn.checked) {
            payresult.textContent="Επιλέξατε Visa για την πληρωμή σας.";
        } else if (masterbtn.checked) {
            payresult.textContent="Επιλέξατε MasterCard για την πληρωμή σας.";
        } else if (paypalbtn.checked) {
            payresult.textContent="Επιλέξατε PayPal για την πληρωμή σας.";
        }
    } 
};

    window.onload = myFunction;

const updateTime = (id) => {
    const element = document.getElementById(id);
    if (element) {
        setInterval(() => {
            element.textContent = new Date().toLocaleTimeString();
        }, 1000);
    }
};

document.addEventListener('DOMContentLoaded', function() {
    updateTime("clock");
    updateTime("clock2");
    updateTime("clock3");
});
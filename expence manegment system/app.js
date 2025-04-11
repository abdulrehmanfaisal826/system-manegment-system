let items = [];

document.getElementById('addBtn').addEventListener('click', () => {
  const name = document.getElementById('itemName').value.trim();
  const price = parseFloat(document.getElementById('itemPrice').value);

  if (name === "" || isNaN(price)) {
    alert("Please enter a valid item name and price.");
    return;
  }

  items.push({ name, price });
  document.getElementById('itemName').value = '';
  document.getElementById('itemPrice').value = '';
  renderItems();
});

document.getElementById('deleteAllBtn').addEventListener('click', () => {
  if (confirm("Are you sure you want to delete all items?")) {
    items = [];
    renderItems();
  }
});

function renderItems() {
  const container = document.getElementById('itemsContainer');
  container.innerHTML = '';
  let total = 0;

  items.forEach((item, index) => {
    total += item.price;

    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';
    itemDiv.innerHTML = `
      <span>${item.name}</span>
      <span>${item.price}</span>
      <div>
        <button onclick="editItem(${index})" class="btn btn-orange">Edit</button>
        <button onclick="deleteItem(${index})" class="btn btn-blue">Delete</button>
      </div>
    `;

    container.appendChild(itemDiv);
  });

  document.getElementById('total').innerText = total;
}

function deleteItem(index) {
  items.splice(index, 1);
  renderItems();
}

function editItem(index) {
  const item = items[index];
  const newName = prompt("Edit item name:", item.name);
  const newPrice = parseFloat(prompt("Edit item price:", item.price));

  if (newName && !isNaN(newPrice)) {
    items[index] = { name: newName.trim(), price: newPrice };
    renderItems();
  } else {
    alert("Invalid input. Edit cancelled.");
  }
}
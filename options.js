document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#campaignTable tbody');

  // Load existing campaigns from storage
  chrome.storage.sync.get(['campaigns'], (result) => {
    const campaigns = result.campaigns || [{ name: '', utm: '' }];
    campaigns.forEach(c => addRow(c.name, c.utm));
  });

  // Add a new row when button is clicked
  document.getElementById('addBtn').addEventListener('click', () => {
    addRow('', '');
  });

  // Save the data
  document.getElementById('saveBtn').addEventListener('click', () => {
    const rows = document.querySelectorAll('#campaignTable tbody tr');
    const campaigns = [];
    
    rows.forEach(row => {
      const name = row.querySelector('.camp-name').value.trim();
      const utm = row.querySelector('.camp-utm').value.trim();
      if (name || utm) {
        campaigns.push({ name, utm });
      }
    });

    chrome.storage.sync.set({ campaigns }, () => {
      const status = document.getElementById('status');
      status.style.display = 'inline';
      setTimeout(() => { status.style.display = 'none'; }, 2000);
    });
  });

  // Function to create a new row in the table
  function addRow(nameVal, utmVal) {
    const tr = document.createElement('tr');
    
    tr.innerHTML = `
      <td><input type="text" class="camp-name" value="${nameVal}" placeholder="MTC Event Q1"></td>
      <td><input type="text" class="camp-utm" value="${utmVal}" placeholder="mtc-q1"></td>
      <td><button class="btn-delete">Delete</button></td>
    `;
    
    // Delete row functionality
    tr.querySelector('.btn-delete').addEventListener('click', function() {
      tr.remove();
    });
    
    tableBody.appendChild(tr);
  }
});
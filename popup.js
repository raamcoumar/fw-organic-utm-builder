document.addEventListener('DOMContentLoaded', function() {
  
  // 1. Open Settings Page Logic
  document.getElementById('openSettings').addEventListener('click', () => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  // 2. Load Campaigns from Storage into the Dropdown
  const campaignSelect = document.getElementById('campaignSelect');
  const campaignCustom = document.getElementById('campaignCustom');

  chrome.storage.sync.get(['campaigns'], function(result) {
    const campaigns = result.campaigns || [];
    campaignSelect.innerHTML = '<option value="">-- Select a Campaign --</option>';
    
    campaigns.forEach(c => {
      if (c.name && c.utm) {
        const option = document.createElement('option');
        option.value = c.utm;
        option.textContent = c.name;
        campaignSelect.appendChild(option);
      }
    });
    
    campaignSelect.innerHTML += '<option value="custom">++ Custom Campaign (Type it out) ++</option>';
  });

  // 3. Toggle Custom Text Input if "Custom" is selected
  campaignSelect.addEventListener('change', function() {
    if (this.value === 'custom') {
      campaignCustom.style.display = 'block';
    } else {
      campaignCustom.style.display = 'none';
      campaignCustom.value = ''; // clear it out
    }
  });

  // 4. Auto-fill Date and Domain/Platform matching (From previous steps)
  const dateInput = document.getElementById('dateStr');
  const today = new Date();
  dateInput.value = `${String(today.getDate()).padStart(2, '0')}${today.toLocaleString('default', { month: 'long' }).toLowerCase()}`;

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    if (tabs[0] && tabs[0].url) {
      try {
        const currentUrl = new URL(tabs[0].url);
        const host = currentUrl.hostname.toLowerCase();
        
        if (host === 'freshworks.com' || host.endsWith('.freshworks.com')) {
          document.getElementById('baseUrl').value = tabs[0].url;
        }
        
        const platformSelect = document.getElementById('platform');
        if (host.includes('linkedin.com')) platformSelect.value = 'linkedin';
        else if (host.includes('twitter.com') || host.includes('x.com')) platformSelect.value = 'twitter';
        else if (host.includes('facebook.com')) platformSelect.value = 'facebook';
        else if (host.includes('instagram.com')) platformSelect.value = 'instagram';
        
      } catch (e) {}
    }
  });

  // 5. Handle Generate & Copy
  document.getElementById('generateBtn').addEventListener('click', function() {
    const baseUrl = document.getElementById('baseUrl').value.trim();
    const platform = document.getElementById('platform').value;
    const format = document.getElementById('format').value;
    const dateStr = document.getElementById('dateStr').value.trim();
    
    // Determine which campaign value to use (Dropdown vs Custom)
    let rawCampaign = campaignSelect.value;
    if (rawCampaign === 'custom') {
      rawCampaign = campaignCustom.value;
    }

    const campaign = rawCampaign.trim().toLowerCase().replace(/\s+/g, '-');

    if (!baseUrl || !campaign || !dateStr || campaignSelect.value === "") {
      alert("Please ensure URL, Campaign, and Date fields are filled out.");
      return;
    }

    try {
      const url = new URL(baseUrl);
      if (url.hostname !== 'freshworks.com' && !url.hostname.endsWith('.freshworks.com')) {
        alert("Hold up! You can only generate UTMs for freshworks.com URLs.");
        return;
      }

      const utmContent = `fw${format}${dateStr}`;
      url.searchParams.set('utm_source', 'social');
      url.searchParams.set('utm_medium', platform);
      url.searchParams.set('utm_campaign', campaign);
      url.searchParams.set('utm_term', 'organic');
      url.searchParams.set('utm_content', utmContent);

      const finalUrl = url.toString();
      const resultContainer = document.getElementById('resultContainer');
      const finalUrlEl = document.getElementById('finalUrl');
      const copyStatus = document.getElementById('copyStatus');

      finalUrlEl.value = finalUrl;
      resultContainer.style.display = 'block';

      navigator.clipboard.writeText(finalUrl).then(() => {
        copyStatus.style.display = 'block';
        setTimeout(() => { copyStatus.style.display = 'none'; }, 2000);
      });

    } catch (e) {
      alert("Invalid Destination URL. Please make sure it starts with https://");
    }
  });
});
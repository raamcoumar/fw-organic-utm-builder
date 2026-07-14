document.addEventListener('DOMContentLoaded', function() {
  // 1. Auto-fill today's date in ddmmmm format (e.g., 08july)
  const dateInput = document.getElementById('dateStr');
  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = today.toLocaleString('default', { month: 'long' }).toLowerCase();
  dateInput.value = `${day}${month}`;

  // 2. Handle Generate & Copy logic
  document.getElementById('generateBtn').addEventListener('click', function() {
    const baseUrl = document.getElementById('baseUrl').value.trim();
    const platform = document.getElementById('platform').value;
    const campaign = document.getElementById('campaign').value.trim();
    const format = document.getElementById('format').value;
    const dateStr = document.getElementById('dateStr').value.trim();

    if (!baseUrl || !campaign || !dateStr) {
      alert("Please fill in the URL, Campaign, and Date fields.");
      return;
    }

    try {
      // Ensure the base URL is valid
      const url = new URL(baseUrl);
      
      // Construct the utm_content string
      const utmContent = `fw${format}${dateStr}`;

      // Append UTM parameters
      url.searchParams.set('utm_source', 'social');
      url.searchParams.set('utm_medium', platform);
      url.searchParams.set('utm_campaign', campaign);
      url.searchParams.set('utm_term', 'organic');
      url.searchParams.set('utm_content', utmContent);

      const finalUrl = url.toString();

      // Display and Copy to clipboard
      const resultContainer = document.getElementById('resultContainer');
      const finalUrlEl = document.getElementById('finalUrl');
      const copyStatus = document.getElementById('copyStatus');

      finalUrlEl.value = finalUrl;
      resultContainer.style.display = 'block';

      navigator.clipboard.writeText(finalUrl).then(() => {
        copyStatus.style.display = 'block';
        setTimeout(() => {
          copyStatus.style.display = 'none';
        }, 2000);
      });

    } catch (e) {
      alert("Invalid Destination URL. Please include https://");
    }
  });
});
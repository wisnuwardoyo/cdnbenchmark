const imageUrlsInput = document.getElementById('image-urls');
const startTestButton = document.getElementById('start-test');
const resultsContainer = document.getElementById('results');

startTestButton.addEventListener('click', () => {
  // Get the image URLs from the input field
  const imageUrls = imageUrlsInput.value.split('\n');

  // Clear the results container
  resultsContainer.innerHTML = '';

  // Start the download performance test
  testPerformance(imageUrls);
});

async function testPerformance(imageUrls) {
  // Array to store the elapsed time for each image
  const elapsedTimes = [];

  // Loop through the image URLs
  for (const imageUrl of imageUrls) {
    // Get the current time in milliseconds
    const startTime = performance.now();

    // Create an image object and set the event handlers
    const image = new Image();
    image.onload = function() {
      // Calculate the elapsed time in milliseconds
      const elapsedTime = performance.now() - startTime;
      elapsedTimes.push(elapsedTime);
      console.log(`Image downloaded in ${elapsedTime} milliseconds`);
    };
    image.onerror = function() {
      console.error('Error downloading image');
    };

    // Set the src attribute to start the download
    image.src = imageUrl;

    // Wait for the image to finish downloading
    await new Promise((resolve) => (image.onload = resolve));
  }

  // Calculate the average elapsed time
  const averageElapsedTime =
    elapsedTimes.reduce((sum, time) => sum + time, 0) / elapsedTimes.length;

  // Display the results in the results container
  resultsContainer.innerHTML = `
    <p>Average elapsed time: ${averageElapsedTime.toFixed(2)} milliseconds</p>
    <p>Elapsed times: ${elapsedTimes.join(', ')} milliseconds</p>
  `;
}

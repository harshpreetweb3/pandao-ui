export function formatStandardDateTime(isoString) {
    const date = new Date(isoString);
  
    // Get the components of the date and time
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
  
    // Construct the formatted string
    const formattedDate = `${month} ${day}, ${year}, ${hours}:${minutes}:${seconds}`;
  
    return formattedDate;
  }
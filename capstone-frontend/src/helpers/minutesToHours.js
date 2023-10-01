function convertToHours(totalMinutes){
    
    const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours} Hours ${minutes} Minutes`;
}

export {convertToHours};
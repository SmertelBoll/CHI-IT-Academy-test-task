export const validateInput = (obj) => {
  if (Object.values(obj).includes("")) {
    alert("Fields cannot be empty. Please complete all information");
    return false;
  }

  if (obj.car_model_year) {
    const OnlyNumberYear = /\D/.test(obj.car_model_year);
    if (OnlyNumberYear) {
      alert("The year field can only contain numbers.");
      return false;
    }
  }

  const OnlyNumberPrice = /^\$?\d*\.?\d+$/.test(obj.price);
  if (!OnlyNumberPrice) {
    alert("The price field can only contain numbers.");
    return false;
  }

  if (obj.availability !== "false" && obj.availability !== "true") {
    alert('The value in the availability field can only be "true" or "false"');
    return false;
  }

  return true;
};

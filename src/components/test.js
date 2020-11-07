const compare = (a, b) => {
  // Use toUpperCase() to ignore character casing

  const A = a.name.toLowerCase();
  const B = b.name.toLowerCase();

  let comparison = 0;
  if (A > B) {
    comparison = 1;
  } else if (A < B) {
    comparison = -1;
  }

  return comparison;
};

let sorted = currentPosts.sort(compare);

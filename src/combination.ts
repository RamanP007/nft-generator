let totalOutputs: number = 0;
const allPossibleCases = (arraysToCombine: any): string[] => {

  const divisors = [];

  let permsCount = 1;

  for (let i = arraysToCombine.length - 1; i >= 0; i--) {

    divisors[i] = divisors[i + 1] ? divisors[i + 1] * arraysToCombine[i + 1].length : 1;

    permsCount *= (arraysToCombine[i].length || 1);

  }

  totalOutputs = permsCount;

  const getCombination = (n, arrays, divisors) => arrays.reduce((acc, arr, i) => {

    acc.push(arr[Math.floor(n / divisors[i]) % arr.length]);
    // console.log(acc);
    // console.log(acc.length)

    return acc;

  }, []);

  const combinations = [];

  const uniqueCombinations: string[] = []



  for (let i = 0; i < permsCount; i++) {

    combinations.push(getCombination(i, arraysToCombine, divisors));

  }

  combinations.forEach(comb =>{
    if(!uniqueCombinations.includes(comb)){
      uniqueCombinations.push(comb)
    }
  })
  console.log(combinations[0])
  console.log(combinations[0][0])
  console.log(combinations.length)
  console.log(uniqueCombinations.length)
  return uniqueCombinations;

};


export {
  allPossibleCases,
  totalOutputs
}
let mojNovcanik = 100;

const kafa = 10;
const sok = 20;
const cigare = 250;

console.log(mojNovcanik >= kafa);
mojNovcanik -= kafa * (mojNovcanik >= kafa);
console.log(mojNovcanik >= sok);
mojNovcanik -= sok * (mojNovcanik >= sok);
console.log(mojNovcanik >= cigare);
mojNovcanik -= cigare * (mojNovcanik >= cigare);

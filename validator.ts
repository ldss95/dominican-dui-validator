/*
	By: Luis David Santiago, 2020-09-11
	Validacion de cedula de identidad y electoral dominicana
*/

function duiIsValid(dui: string): boolean {
	let isValid: boolean = false;
	let sum: number = 0;

	if(!dui || dui.length != 11){
		return isValid;
	}

	const duiIndividualDigits: string[] = dui.split('');
	duiIndividualDigits.forEach((digit: string | number, index: number) => {
		//Ignoramos el ultimo digito
		if((index + 1) == dui.length){
			return;
		}

		digit = Number(digit);
		const multipler: number = (index % 2) ? 2: 1;

		/*
			Si el valor resultante de la multiplicacion es superior a 9 (contiene 2 digitos)
			lo separamos y usamos de manera individual.
		*/
		if((digit * multipler) > 9){
			sum += Number((digit * multipler).toString().charAt(0));
			sum += Number((digit * multipler).toString().charAt(1));
		}else{
			sum += digit * multipler;
		}
	})

	/*
		topTen representa la decena inmediatamente superior a la suma (sum)
		ej: la decena superior de 37 es 40
	*/
	const topTen: number = (Math.floor(sum / 10) + 1) * 10;
	const lastDigit: number = Number(duiIndividualDigits.pop());

	if(lastDigit == (topTen - sum)){
		isValid = true;
	}

	return isValid;
}

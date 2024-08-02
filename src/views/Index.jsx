import React, {useState, useEffect} from 'react'
import Input from '../components/Input';
import Select from '../components/Select';


const Index = () => {

    const [edad, setEdad] = useState(0);
    const [peso, setPeso] = useState(0);
    const [altura, setAltura] = useState(0);
    const [factor, setFactor] = useState(1.6);

    const [calorias, setCalorias] = useState(0);

    const [objmetrico, setObjMetrico] = useState({ altura: "Pulgadas", peso: "Libras", tipo: 0 });

    const [erroredad, setErrorEdad] = useState("");
    const [errorpeso, setErrorPeso] = useState("");
    const [erroraltura, setErrorAltura] = useState("");

    const [errorcalorias, setErrorCalorias] = useState("");
    
    const calcularFactor = (peso) => {
        
        if (!isNaN(peso))
        {
            if (peso < 165)
                setFactor(1.6);
    
            if (peso >= 165 && peso <= 200)
                setFactor(1.4);
    
            if (peso >= 201 && peso <= 220)
                setFactor(1.2);
    
            if (peso > 220)
                setFactor(1);
        }
    }

    const validarRangos = (valor, rango1, rango2, propname = "", unidad = "") => {
        let error = "";

        if (!(valor >= rango1 && valor <= rango2))
            error = `${propname} debe estar entre los rangos ${rango1} ${unidad} y ${rango2} ${unidad}`;
        
        return error;
    }

    const validarNegativos = (valor) => {
        let error = "";

        if (valor < 0)
            error = "El valor no puede ser menor a 0"
        
        return error;
    }

    useEffect(() => {

        calcularCalorias();

    }, [edad, peso, altura])

    const calcularCalorias = () => {

        if(erroredad || errorpeso || erroraltura)
        {
            setErrorCalorias("Digite correctamente los campos");
            return;
        }

        setErrorCalorias("");

        let pesokg = peso;
        let alturacm = altura;

        if(objmetrico.tipo == 0)
        {
            pesokg = convertirUnidades(peso, "LB/KG");
            alturacm = convertirUnidades(altura, "IN/CM");
        }

        //console.log(pesokg)
        ///console.log(alturacm)
        //console.log(edad)
        ///console.log(factor)
        
        let cal = (10 * pesokg + 6.25 * alturacm -10 * edad + 5) * factor;
        setCalorias(cal);
    }

    const validarEdad = (value) => {
        
        setEdad(value)

        if (!value)
        {
            setErrorEdad("Digite el campo Edad")
            return;
        }

        let valor = parseFloat(value)
        let min = 16;
        let max = 105;

        let errorRangos = validarRangos(valor, min, max, "Edad");
        let errorNegativo = validarNegativos(valor);        

        if (!errorRangos && !errorNegativo)
        {                                
            setErrorEdad("");
        }

        if (errorRangos)
            setErrorEdad(errorRangos)

        if (errorNegativo)
            setErrorEdad(errorNegativo)
    }

    const validarPeso = (value, tipometrico) => {
        setPeso(value); 

        if (!value)
        {
            setErrorPeso("Digite el campo Peso")
            return;
        }

        let valor = parseFloat(value);
        let errorRangos = "";
        let errorNegativo = "";

        //KG
        let min_kg = 40.50; /// 0.4536
        let max_kg = 300;
        
        //LB
        //let min_lb = min_kg  / 0.4536;
        //let max_lb = max_kg  / 0.4536;

        let min_lb = convertirUnidades(min_kg, "KG/LB");
        let max_lb = convertirUnidades(max_kg, "KG/LB");

        //.log(min_lb)

        if (tipometrico == 0)
        {
            errorRangos = validarRangos(valor, min_lb, max_lb, "Peso", "Lb.");            
        }else
        {
            errorRangos = validarRangos(valor, min_kg, max_kg, "Peso", "Kg.");
            
        }

        let valor_libra = tipometrico != 0 ? valor : valor * 0.4536;
        //console.log("lo que se envia a calcularFactor", valor_libra);
        calcularFactor(valor_libra);

        if (!errorRangos && !errorNegativo)
        {                                
            setErrorPeso("");
        }

        if (errorRangos)
            setErrorPeso(errorRangos)

        if (errorNegativo)
            setErrorPeso(errorNegativo)
    }

    const validarAltura = (value, tipometrico) => {

        setAltura(value);

        if (!value)
        {
            setErrorAltura("Digite el campo Altura")
            return;
        }

        let valor = parseFloat(value);
        let errorRangos = "";
        let errorNegativo = "";

        //mts
        const min = 1.40;
        const max = 2.25;

        //CM
        let min_cm = min * 100;
        let max_cm = max * 100;
        
        //PL
        //let min_pl = min  / 2.54;
        //let max_pl = max  / 2.54;

        let min_pl = convertirUnidades(min_cm, "CM/IN");
        let max_pl = convertirUnidades(max_cm, "CM/IN");

        if (tipometrico == 0)
        {
            //Pulgadas
            errorRangos = validarRangos(valor, min_pl, max_pl, "Altura", "in.");
            
        }else
        {
            //Centimetros
            errorRangos = validarRangos(valor, min_cm, max_cm, "Altura", "cm.");
        }

        errorNegativo = validarNegativos(valor);        

        if (!errorRangos && !errorNegativo)
        {                                
            setErrorAltura("");
        }

        if (errorRangos)
            setErrorAltura(errorRangos)

        if (errorNegativo)
            setErrorAltura(errorNegativo)
    }

    const convertirUnidades = (valor, tipo) =>
    { 
        let valorcon = 0;
        switch (tipo) {
            case "KG/LB":
                valorcon = valor  / 0.4536;
                break;
            case "LB/KG":
                valorcon = valor * 0.4536;
                break;
            case "CM/IN":
                valorcon = (valor / 2.54);
                break;
            case "IN/CM":
                valorcon = (valor * 2.54);
                break;        
            default:
                valorcon = valor;
                break;
        }

        return valorcon;
    }

    return (
        <div>
            <span>Reto Lógico No. 1</span>

            <Input title="Edad" 
                    type="number"
                    valor={edad} 
                    error={erroredad}
                    fxgeneric={(e) => { 
                        validarEdad(e.target.value);
                     }} />
            
            <Input title="Peso" 
                    type="number"
                    valor={peso} 
                    name={objmetrico.peso}
                    error={errorpeso}
                    fxgeneric={(e) => { 
                        validarPeso(e.target.value, objmetrico.tipo);
                     }} />

                <Input title="Altura" 
                    type="number"
                    valor={altura} 
                    name={objmetrico.altura}
                    error={erroraltura}
                    fxgeneric={(e) => { 
                        validarAltura(e.target.value, objmetrico.tipo);
                     }} />

                     


            <Select lista={[{value:"0",descript:"Imperial (Libras / Pulgadas)"}, {value:"1",descript:"Decimal (Kilogramos / Centimetros)"}]} 
                    fxgeneric={(e) => {

                        let obj = {...objmetrico};
    
                        let tipo = parseInt(e.target.value);
    
                        //console.log(tipo)
    
                        obj.altura = tipo == 0 ? "Pulgadas" : "Centimetros";
                        obj.peso = tipo == 0 ? "Libras" : "Kilogramos"
                        obj.tipo = tipo;       
    
                        let newpeso = peso;
                        let newaltura = altura;


                        if(!isNaN(peso))
                        {
                            if(tipo == 0)
                            {
                                //LB a KG
                                newpeso = peso / 0.4536;
                                setPeso(newpeso);
                            }else
                            {
                                //PL a CM
                                newpeso = peso * 0.4536;
                                setPeso(newpeso);
                            }
                        }

                        if(!isNaN(altura))
                        {
                            if(tipo == 0)
                            {
                                //CM a PL
                                newaltura = altura / 2.54;
                                setAltura(newaltura);
                            }else
                            {
                                //PL a CM
                                newaltura = altura * 2.54;
                                setAltura(newaltura);
                            }
                        }

                        validarAltura(newaltura, tipo);
                        validarPeso(newpeso, tipo);
    
                        setObjMetrico(obj);
                    }}/>

            <div className='py-8'>
                <span>Calorias</span>
                <br/>
                {errorcalorias ? <span className='text-red-600 text-sm'>{errorcalorias}</span> : <span>{calorias} cal</span>}
                

                <div>
                    
                </div>
            </div>
        </div>
    );

}

export default Index;
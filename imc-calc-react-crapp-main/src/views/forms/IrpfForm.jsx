import React, { useState } from "react"
import PersonIRPF from "../../domain/PersonIrpf"
import IrpfController from "../../controllers/IrpfController"
import useInput from "../../hooks/useInput"



const IrpfForm = () => {
    const [controller,] = useState(new IrpfController())
    const [totalSalary, totalSalaryProps, resettotalSalary] = useInput(0.0)
    const [dependents, dependentsNumberProps, resetdependentsNumber] = useInput(0.0)
    const [person, setPerson] = useState(new PersonIRPF(0,0));
    const [showModalResultado, setShowModalResultado] = useState(false);

    const handleModalResultado = () => { setShowModalResultado(!showModalResultado)}

    const calculate = async (evt) => {
        evt.preventDefault()
        const p = new PersonIRPF(parseFloat(totalSalary), parseFloat(dependents))                                    
        p.irpf = await controller.calculate(p)
        setPerson(p)
        resettotalSalary()
        resetdependentsNumber()
        handleModalResultado()
    };


    return (
        <>
        <form className="form" onSubmit={calculate}> 
            <div className="row">
                <label>Salario</label>
                <input id="totalSalary"
                       type="number"  
                       {...totalSalaryProps}
                       placeholder="0.00"/>
            </div>
            <div className="row">
                <label>Número de dependentes!</label>
                <input id="dependents"
                       type="number"  
                       {...dependentsNumberProps}
                       placeholder="0.00"/>
            </div>
            <div className="col-12 mb-3">
                <button
                    className="btn btn-outline-primary mt-3"
                    type="submit"
                >
                    Calcular
                </button>
            </div>
            {/* <div className="col-12 mb-3">
            <p>Salario: {person.totalSalary}</p>
            <p>dependentes: {person.dependentsNumber}</p>
            <p>irpf: {person._irpf}</p>
            </div> */}
          <p>irpf: {person._irpf}</p>
        </form>
        
      

        </>
    )
}

export default IrpfForm
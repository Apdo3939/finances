import React, { useState, useEffect } from "react";
import './styles.css';

export const Home = () => {

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    const [data, setData] = useState([]);
    const [dateValue, setDateValue] = useState({
        year,
        month
    });

    const prev = async () => {
        if (dateValue.month === 1) {
            setDateValue({
                year: dateValue.year - 1,
                month: 12
            });
        } else {
            setDateValue({
                year: dateValue.year,
                month: dateValue.month - 1
            });

        }
    }
    const next = async () => {
        if (dateValue.month === 12) {
            setDateValue({
                year: dateValue.year + 1,
                month: 1
            });
        } else {
            setDateValue({
                year: dateValue.year,
                month: dateValue.month + 1
            });

        }
    }

    const listFinances = async () => {
        var values = [
            {
                'id': 1,
                'nome': 'Conta de luz',
                'valor': 80,
                'tipo': 1,
                'status': 1
            },
            {
                'id': 2,
                'nome': 'Conta de telefone',
                'valor': 159.90,
                'tipo': 1,
                'status': 1
            },
            {
                'id': 3,
                'nome': 'Conta de cartão de crédito',
                'valor': 659.90,
                'tipo': 1,
                'status': 2
            },
            {
                'id': 4,
                'nome': 'Salário',
                'valor': 1100,
                'tipo': 2,
                'status': 1
            }
        ]

        setData(values);
    }

    useEffect(() => { listFinances() }, []);

    return (
        <div className='container'>
            <div className="content">
                <h1>Situação Financeira</h1>
                <p>Mês atual: {dateValue.month}</p>
                <p>Ano atual: {dateValue.year}</p>
                <div className='contentButton'>
                    <button type="button" onClick={() => prev()}>Anterior</button>
                    <button type="button" onClick={() => next()}>Proximo</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(res => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.nome}</td>
                                <td>{res.tipo === 1 ? <p>Débito</p> : <p>Crédito</p> }</td>
                                <td>{res.status === 1 ? <p>Efetuado</p> : <p>Pendente</p> }</td>
                                <td>{res.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>Total</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td>899.98</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
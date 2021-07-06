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
                <div className="contentTitle">
                    <h1>Situação Financeira</h1>
                    <button className="cadastrarButton" type="button" onClick={() => prev()}>Cadastrar</button>
                </div>

                <div className='contentButton'>
                    <p>Mês atual: <span className="dateSpan">{dateValue.month}</span></p>
                    <p>Ano atual: <span className="dateSpan">{dateValue.year}</span></p>
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
                                <td>{res.tipo === 1 ? <span className="debitSpan">Débito</span> : <span className="creditSpan">Crédito</span>}</td>
                                <td>{res.status === 1 ? <span className="creditSpan">Efetuado</span> : <span className="debitSpan">Pendente</span>}</td>
                                <td>{res.valor}</td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>899.98</th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
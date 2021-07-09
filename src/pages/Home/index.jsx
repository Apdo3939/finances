import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './styles.css';
import api from '../../config/configApi';
import moment from 'moment';

export const Home = () => {

    var currentDate = new Date();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    const [data, setData] = useState([]);
    const [dateValue, setDateValue] = useState({
        year,
        month
    });
    const [saldo, setSaldo] = useState("");
    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const prev = async () => {
        if (dateValue.month === 1) {
            year = dateValue.year - 1;
            month = 12;
            setDateValue({
                year,
                month
            });
            listFinances(month, year);
        } else {
            year = dateValue.year;
            month = dateValue.month - 1;
            setDateValue({
                year,
                month
            });
            listFinances(month, year);
        }
    }
    const next = async () => {
        if (dateValue.month === 12) {
            year = dateValue.year + 1;
            month = 1;
            setDateValue({
                year,
                month
            });
            listFinances(month, year);
        } else {
            year = dateValue.year;
            month = dateValue.month + 1;
            setDateValue({
                year,
                month
            });
            listFinances(month, year);
        }
    }

    const listFinances = async (month, year) => {

        if (month === undefined && year === undefined) {
            var currentDate = new Date();
            month = currentDate.getMonth() + 1;
            year = currentDate.getFullYear();
        }

        await api.get('/listar/' + month + '/' + year)
            .then((response) => {
                setData(response.data.lancamentos);
                setSaldo(response.data.saldo);
                setStatus({
                    type: 'success',
                    message: response.data.message,
                });
            })
            .catch((err) => {
                if (err.response) {
                    setStatus({
                        type: 'erro',
                        message: err.response.data.message,
                    });
                } else {
                    setStatus({
                        type: 'erro',
                        message: 'Erro: Tente mais tarde!',
                    });
                }
                console.log("Erro de conexão!" + err);
            });
    }

    useEffect(() => { listFinances(month, year) }, [month, year]);

    return (
        <div className='container'>
            <div className="content">
                <div className="contentTitle">
                    <h1>Situação Financeira</h1>
                    <Link to="/cadastrar">
                        <button className="cadastrarButton" type="button" >Cadastrar</button>
                    </Link>
                </div>
                {status.type === 'erro' ? <span className="spanError">{status.message}</span> : ''}
                {status.type === 'success' ? <span className="spanSucess">{status.message}</span> : ''}
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
                            <th>Vencimento</th>
                            <th>Valor</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(res => (
                            <tr key={res.id}>
                                <td>{res.id}</td>
                                <td>{res.nome}</td>
                                <td>{res.tipo === 1 ? <span className="debitSpan">Débito</span> : <span className="creditSpan">Crédito</span>}</td>
                                <td>{res.status === 1 ? <span className="creditSpan">Efetuado</span> : <span className="debitSpan">Pendente</span>}</td>
                                <td>{moment(res.vencimento).format('DD/MM/YYYY')}</td>
                                <td>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(res.valor)}</td>
                                <td>
                                    <Link to={`/editar/${res.id}`} ><button>Editar</button></Link>
                                    <button> Apagar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Saldo</th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th>{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldo)}</th>
                            <th></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
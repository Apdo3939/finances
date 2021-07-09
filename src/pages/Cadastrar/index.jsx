import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from '../../config/configApi';
import './styles.css';

export const Cadastrar = () => {

    const [lancamento, setLancamento] = useState(
        {
            nome: '',
            valor: '',
            tipo: '',
            status: '',
            vencimento: ''
        }
    );

    const [status, setStatus] = useState({
        type: '',
        message: '',
    });

    const [valorConverter, setValorConverter] = useState('');

    const handleInputvalue = e => {
        setLancamento({ ...lancamento, [e.target.name]: e.target.value })
    }

    const handleInputValueCustom = async e => {

        var valorCustom = e.target.value;
        valorCustom = valorCustom.replace(/\D/g, '');
        valorCustom = valorCustom.replace(/(\d)(\d{2})$/, "$1,$2");
        valorCustom = valorCustom.replace(/(?=(\d{3})+(\D))\B/g, '.');
        setValorConverter(valorCustom);
        var valorSalvar = await valorCustom.replace('.', '');
        valorSalvar = await valorSalvar.replace(',', '.');
        setLancamento({ ...lancamento, valor: valorSalvar });
    }

    const handleSave = async e => {
        e.preventDefault();

        const headers = { 'Content-Type': 'application/json' }

        await api.post("/cadastrar", lancamento, { headers })
            .then(response => {
                setStatus({
                    type: 'success',
                    message: response.data.message,
                });
            })
            .catch(err => {
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
            });
    }

    return (
        <div className="container">
            <div className="content">
                <div className="contentTitle">
                    <h1 className="title">
                        Cadastrar
                    </h1>
                    <Link to="/"><button>Listar</button></Link>

                </div>

                {status.type === 'erro' ? <span className="spanError">{status.message}</span> : ''}
                {status.type === 'success' ? <span className="spanSucess">{status.message}</span> : ''}

                <form className="contentForm" onSubmit={handleSave}>

                    <input type="text" name="nome" placeholder="Nome do lançamento" onChange={handleInputvalue} />

                    <input type="text" name="valor" value={valorConverter} placeholder="Valor do lançamento" onChange={handleInputValueCustom} />

                    <select name="tipo" onChange={handleInputvalue} >
                        <option value="">Selecione o tipo</option>
                        <option value="1">Débito</option>
                        <option value="2">Crédito</option>
                    </select>

                    <select name="status" onChange={handleInputvalue} >
                        <option value="">Selecione o status</option>
                        <option value="1">Efetuado</option>
                        <option value="2">Pendente</option>
                    </select>

                    <input type="date" name="vencimento" placeholder="Vencimento do lançamento" onChange={handleInputvalue} />

                    <div className="contentButtonCadastrar">
                        <button className='cadastrarButton' type="submit">Cadastrar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
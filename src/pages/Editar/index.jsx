import React, { useEffect, useState } from "react";
import moment from 'moment';
import { Link } from "react-router-dom";
import api from '../../config/configApi';
import '../Cadastrar/styles.css';

export const Editar = (props) => {
    const [id] = useState(props.match.params.id);
    const [nome, setNome] = useState('');
    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [status, setStatus] = useState('');
    const [vencimento, setVencimento] = useState('');
    const [valorConverter ,setValorConverter] = useState('');

    const [statusMessage, setStatusMessage] = useState({
        type: '',
        message: ''
    });

    const handleConvertCoin = async (convertCoinInput) =>{
        var valorCustom = convertCoinInput.toString().replace(/\D/g, '');
        console.log(valorCustom);
        valorCustom = valorCustom.replace(/(\d)(\d{2})$/, "$1,$2");
        valorCustom = valorCustom.replace(/(?=(\d{3})+(\D))\B/g, '.');
        
        setValorConverter(valorCustom);
        console.log(valorCustom);

        var valorSalvar = await valorCustom.replace(".", "");
        valorSalvar = await valorSalvar.replace(",", ".");
        setValor(valorSalvar);
        console.log(valorSalvar);

    }

    const handleUpdate = async e => {
        e.preventDefault();
        const headers = { 'Content-Type': 'application/json' }
        api.put('/editar', { id, nome, valor, tipo, status, vencimento }, {headers})
        .then(response => {
            setStatusMessage({
                type: 'success',
                message: response.data.message,
            });
        })
        .catch(err => {
            if (err) {
                setStatusMessage({
                    type: 'erro',
                    message: err.response.data.message,
                });
            } else {
                setStatusMessage({
                    type: 'erro',
                    message: 'Erro: Tente mais tarde!',
                });
            }
        });
    }

    useEffect(() => {
        const getLancamento = async () => {
            await api.get(`/visualizar/${id}`)
                .then(response => {
                    setNome(response.data.lancamento.nome);
                    setValor(response.data.lancamento.valor);
                    handleConvertCoin(response.data.lancamento.valor);
                    setTipo(response.data.lancamento.tipo);
                    setStatus(response.data.lancamento.status);
                    setVencimento(moment(response.data.lancamento.vencimento).format("YYYY-MM-DD"));
                })
                .catch(err => {
                    if (err) {
                        setStatusMessage({
                            type: 'erro',
                            message: err.response.data.message,
                        });
                    } else {
                        setStatusMessage({
                            type: 'erro',
                            message: 'Erro: Tente mais tarde!',
                        });
                    }
                });
        }
        getLancamento()
    }, [id])

    return (
        <div className='container'>
            <div className="content">
                <div className="contentTitle">
                    <h1 className="title">
                        Editar
                    </h1>
                    <Link to="/"><button>Listar</button></Link>
                </div>

                {statusMessage.type === 'erro' ? <span className="spanError">{status.message}</span> : ''}
                {statusMessage.type === 'success' ? <span className="spanSucess">{status.message}</span> : ''}

                <form className="contentForm" onSubmit={handleUpdate}>

                    <input type="text" name="nome" placeholder="Nome do lançamento" value={nome} onChange={e => setNome(e.target.value)} />

                    <input type="text" name="valorConverter" placeholder="Valor do lançamento" value={valorConverter} onChange={e => handleConvertCoin(e.target.value)} />

                    <select name="tipo" value={tipo} onChange={e => setTipo(e.target.value)} >
                        <option value="">Selecione o tipo</option>
                        <option value="1">Débito</option>
                        <option value="2">Crédito</option>
                    </select>

                    <select name="status" value={status} onChange={e => setStatus(e.target.value)} >
                        <option value="">Selecione o status</option>
                        <option value="1">Efetuado</option>
                        <option value="2">Pendente</option>
                    </select>

                    <input type="date" name="vencimento" placeholder="Vencimento do lançamento" value={vencimento} onChange={e => setVencimento(e.target.value)} />

                    <div className="contentButtonCadastrar">
                        <button className='cadastrarButton' type="submit">Editar</button>
                    </div>

                </form>
            </div>
        </div>
    );
}
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdicionarProdutos.scss';

export default function AdicionarProduto() {
    document.title = "ADICIONAR PRODUTOS";

    const navigate = useNavigate();
    const [novoProduto, setNovoProduto] = useState({
        id: '',
        nome: '',
        desc: '',
        preco: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNovoProduto(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Inserir o novo produto na API
        fetch('http://localhost:5000/produtos', {
            method: 'POST',
            body: JSON.stringify(novoProduto),
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
            },
        })
        .then(response => response.json())
        .then(data => {
            console.log('Produto adicionado com sucesso:', data);
            navigate("/produtos");
        })
        .catch(error => console.error('Erro ao adicionar o produto:', error));
    };

    return (
        <div className="addProduto">
            <h1>ADICIONAR PRODUTO</h1>
            <form onSubmit={handleSubmit}>
                {['id', 'nome', 'desc', 'preco'].map(field => (
                    <div className="addProduto" key={field}>
                        <label htmlFor={field}>{field.toUpperCase()}</label>
                        <input
                            type="text"
                            name={field}
                            id={field}
                            placeholder={`Digite o ${field} do produto`}
                            value={novoProduto[field]}
                            onChange={handleChange}
                        />
                    </div>
                ))}
                <div>
                    <button type="submit">ADICIONAR</button>
                </div>
            </form>
        </div>
    );
}

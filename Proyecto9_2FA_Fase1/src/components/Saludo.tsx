type Props = {
    nombre: string;
}

function Saludo({ nombre }: Props) {

    return (
        <h2>Hola {nombre}</h2>
    );

}

export default Saludo;
import styled from 'styled-components'

const SidebarButton = styled.div`
    width: 160px;
    padding: 10px 20px;
    text-decoration: none;
    text-align: center;
    color: #333;
    background-color: #ccc;
    border: 2px solid white;
    border-radius: 5px;
    transition: background-color 0.3s, color 0.3s;
    cursor: pointer;

    &:hover {
        background-color: silver;
        color: white;
    }
`
export default SidebarButton
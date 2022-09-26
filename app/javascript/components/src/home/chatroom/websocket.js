const openConnection = () => new WebSocket(`wss://${process.env.PUBLIC_URL}/cable`);
export default openConnection;

const openConnection = () => new WebSocket(`ws://${process.env.PUBLIC_URL}/cable`);
export default openConnection;

interface messageInterface
{
  badge: string,
  color :string,
  creado:Date,
  creadoPor: string,
  descripcion : string,
  displayName : string,
  habilitado : boolean,
  id: string,
  message : string,
  modificado : Date,
  modificadoPor : string,
  roomId : number,
  subscriber: boolean,
  typeEntity : string,
  username : string,
  activoPopUp: boolean

}
export default messageInterface;

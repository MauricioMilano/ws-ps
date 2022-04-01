export class exceptionMessages {

 static getExceptionsMessages() {
    return  {
      vendedor:{
        controllers: {
          error_saving: "[vendedorController] Erro ao salvar vendedor no sistema",
          error_reading: "[vendedorController] Erro ao recuperar vendedor do sistema"
        }
      },
      leads: {
        controllers: {
          error_saving: "[leadsController] Erro ao salvar leads no sistema",
          error_reading: "[leadsController] Erro ao recuperar leads do sistema"
        }
      }
    }
  }
}

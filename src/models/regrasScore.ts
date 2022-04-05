import { Lead } from './lead'
import { Vendedor } from './vendedor'
const moment = require('moment')
moment.locale('pt-br')
type Resume = {
  Leads: Array<Lead>
  Vendedores: Array<Vendedor>
}
export class regrasScore {
  public nivel: string
  public multiplicador: number

  constructor(nivel: string, multiplicador: number) {
    this.nivel = nivel
    this.multiplicador = multiplicador
  }
  public static getRegrasAggregate() {
    return [
      {
        $lookup: {
          from: 'RegrasScore',
          localField: 'nivel_senioridade',
          foreignField: 'nivel',
          as: 'regras'
        }
      },
      {
        $addFields: {
          regras: {
            $arrayElemAt: ['$regras', 0]
          }
        }
      },
      {
        $project: {
          nome: 1,
          nivel: '$nivel_senioridade',
          multiplicador: '$regras.multiplicador',
          ultimo_lead_recebido: 1
        }
      }
    ]
  }
  public static processaRegra(vendedores:any[], escolhido:any){
    const agora = moment(new Date())
    escolhido.score = -1
    vendedores.forEach((lead) => {
      const atendeuHoje = agora.diff(lead.ultimo_lead_recebido, 'days')

      if (atendeuHoje > 1) {
        const date = `${agora.year()}-${agora.month()}-${agora.day()}T12:00:00.000Z`
        console.log(date);
        lead.ultimo_lead_recebido = new Date(
          `${agora.year()}-${agora.month().toString().padStart(2,"0")}-${agora.day().toString().padStart(2,"0")}T12:00:00.000Z`
        )
      }
      console.log(lead)
      const horasSemAtender = agora.diff(lead.ultimo_lead_recebido, "hours")
      lead.score = horasSemAtender*lead.multiplicador
      if(lead.score > escolhido.score) escolhido = lead
      delete lead.multiplicador

    })

    return [vendedores, escolhido];
  }
  public static validaHorario() {
    const agora = moment(new Date())

    const isDiaDeSemana = agora.day()
      const hora = agora.hour()
      const dias_sem_trabalho = process.env.DIAS_SEM_TRABALHO?.split(",").map(x=>Number(x)) || [0, 6]
      const domingo = 0
      const sabado = 6
      const relogio9h = Number(process.env.INICIO_EXPEDIENTE) | 9
      const relogio18h = Number (process.env.FIM_EXPEDIENTE) | 18
      if (
        dias_sem_trabalho.indexOf(isDiaDeSemana)>=0 &&
        hora >= relogio9h &&
        hora < relogio18h
      ) {
        return true
      }
      else{
        throw new Error("Vendedores fora do horário de trabalho. Lead Não pode ser registrado")
      }
  }
}

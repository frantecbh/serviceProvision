import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancellationMail {
  get Key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    console.log('A fila executou');
    const { appointment } = data;
    await Mail.sendmail({
      to: `${appointment.company.name} <${appointment.company.email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        provider: appointment.company.name,
        user: appointment.user.name,
        date: format(parseISO(appointment.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          { locale: pt }),
      },
    });
  }
}

export default new CancellationMail();

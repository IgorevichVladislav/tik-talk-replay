import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'hourAgo',
  standalone: true
})

@Pipe({
  name: 'timeAgo',
  standalone: true, // Указываем, что пайп standalone
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null): string {
    if (!value) {
      return 'Дата неизвестна';
    }

    const date = new Date(value);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime(); // Разница в миллисекундах

    if (isNaN(diffMs)) {
      return 'Неверная дата';
    }

    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffSec < 60) {
      return diffSec === 1 ? '1 секунда назад' : `${diffSec} секунд назад`;
    } else if (diffMin < 60) {
      return diffMin === 1 ? '1 минута назад' : `${diffMin} минут назад`;
    } else if (diffHour < 24) {
      return diffHour === 1 ? '1 час назад' : `${diffHour} часов назад`;
    } else if (diffDay < 7) {
      return diffDay === 1 ? '1 день назад' : `${diffDay} дней назад`;
    } else {
      // Для всего старше недели возвращаем дату в формате "ДД.ММ.ГГГГ"
      return date.toLocaleDateString();
    }
  }
}

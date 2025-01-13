import {Pipe, PipeTransform} from "@angular/core";
import {DateTime} from "luxon";

@Pipe({
  name: 'timeAgo',
  standalone: true, // Указываем, что пайп standalone
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: string | null, timeZone: string = "UTC"): string {
    if (!value) {
      return "Дата неизвестна";
    }

    // Интерпретируем входное значение как UTC, затем переводим в нужный часовой пояс
    const date = DateTime.fromISO(value, { zone: "utc" }).setZone(timeZone);

    if (!date.isValid) {
      return "Неверная дата";
    }

    // Используем метод toRelative для получения относительного времени
    const relativeTime = date.toRelative({
      locale: "ru", // Устанавливаем локаль (например, русская)
      style: "long", // Полный стиль отображения (можно "narrow" или "short")
      round: true, // Округляем до целых значений
    });

    // Если результат доступен, возвращаем его, иначе возвращаем форматированную дату
    return relativeTime || date.toLocaleString(DateTime.DATE_MED);
  }
}

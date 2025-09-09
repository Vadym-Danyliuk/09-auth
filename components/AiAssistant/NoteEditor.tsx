import { AiAssistant } from './AiAssistant';

export function NoteEditor({ note }: { note: string }) {
  return (
    <div>
      <h2>Нотатка</h2>
      <p>{note}</p>
      <AiAssistant note={note} />
    </div>
  );
}
export default function Home() {
  const remove = (e) => {
    e.target.style.viewTransitionName = `flagged-for-removal`;
    document.startViewTransition(() => e.target.remove());
  };

  return (
    <>
      <title>CSS View Transitions</title>
      <main className={`container`}>
        {Array.from(Array(80)).map((_, i) => (
          <div
            className={"box"}
            style={{ viewTransitionName: `card-${i}` }}
            onClick={(e) => remove(e)}
            key={`card-${i}`}
          >
            {i + 1}
          </div>
        ))}
      </main>
    </>
  );
}

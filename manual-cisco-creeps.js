async function spectateRandom() {
  const buttons = Array.from(document.querySelectorAll('button')).filter(
    button => button.innerHTML == 'INSPECT'
  );
  if (buttons.length == 0) {
    console.log('No one seems to be playing right now 😐');
    return;
  }
  else
    console.log('Found', buttons.length, 'players to spectate 🕵️‍♂️');
  
  players = await fetch(`https://creeps.assistants.epita.fr/info`).then(A => A.json()).catch(() => null)
  if (!players || players.length == 0) {
    console.log('No one seems to be playing right now 😐');
    return;
  }

  const re = /.*\..*-.*/;
  best = players.filter(e1 => e1.login.match(re) != null).sort((e1, e2) => e2.achievements.length - e1.achievements.length)[0];

  console.log('Best player:', best.login, best.achievements.length, ' achievements 🏆!');
  
  const bestname = best.login.split('-')[0].trim();
  
  buttons.filter(b => b.parentElement.innerHTML.toString().includes(bestname))[0].click();

  setTimeout(() => {
    const currentPlayerDiv = document.querySelector("#app > main > div > header > div.current-player");
    console.log('Spectating', bestname + ' 🕵️‍♂️');
    currentPlayerDiv.childNodes[2].click();
  }, 50);
}

setInterval(() => {
    spectateRandom();
}, 2000);
this.setTimeout(() => {
  window.location.reload();
}, 60000 * 5);

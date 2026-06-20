const fs = require('fs');
const dir = 'C:\\Users\\Casa\\Downloads\\manipro\\';
const files = ['index.html', 'barberos-features.js', 'pkg_booking.js'];

files.forEach(f => {
  const p = dir + f;
  if (!fs.existsSync(p)) return;
  let c = fs.readFileSync(p, 'utf8');
  const orig = c;

  // === CORES ===
  // Dourado -> Lilas
  c = c.replace(/#C9A84C/gi, '#9B59B6');
  c = c.replace(/#c9a84c/gi, '#9B59B6');
  // Dourado escuro -> Lilas escuro
  c = c.replace(/#B8973E/gi, '#8E44AD');
  c = c.replace(/#A6882F/gi, '#7D3C98');
  // CSS var --gold -> lilas
  c = c.replace(/--gold:\s*#[0-9A-Fa-f]{6}/g, '--gold:#9B59B6');
  c = c.replace(/var\(--gold\)/g, 'var(--gold)'); // keep as is, value changed above
  // rgba(201,168,76 -> rgba(155,89,182
  c = c.replace(/rgba\(201,168,76/g, 'rgba(155,89,182');
  c = c.replace(/rgba\(201, 168, 76/g, 'rgba(155, 89, 182');
  // accent-color:#C9A84C -> lilas
  c = c.replace(/accent-color:\s*#C9A84C/gi, 'accent-color:#9B59B6');
  c = c.replace(/accent-color:\s*#c9a84c/gi, 'accent-color:#9B59B6');

  // === NOMENCLATURA ===
  // BarberOS -> Designer de unhas (titulo/brand)
  c = c.replace(/BarberOS/g, 'ManiPro');
  c = c.replace(/Barber\s*OS/g, 'ManiPro');
  c = c.replace(/BARBEROS/g, 'MANIPRO');
  
  // "Barbearia" -> "Salão"
  c = c.replace(/Barbearia/g, 'Sal\u00e3o');
  c = c.replace(/barbearia/g, 'sal\u00e3o');
  c = c.replace(/BARBEARIA/g, 'SAL\u00c3O');
  
  // "Barbeiro" -> "Profissional"
  c = c.replace(/Barbeiro/g, 'Profissional');
  c = c.replace(/barbeiro/g, 'profissional');
  c = c.replace(/BARBEIRO/g, 'PROFISSIONAL');
  // "Barbeiros" -> "Profissionais"
  c = c.replace(/Profissionals/g, 'Profissionais');
  c = c.replace(/profissionals/g, 'profissionais');
  // Fix: "Barbeiros" that became "Profissionals" 
  c = c.replace(/Barbeiros/g, 'Profissionais');
  c = c.replace(/barbeiros/g, 'profissionais');
  
  // "barber" in UI text (not variable names)
  // Be careful: dont change variable names like barber_id, barber_name etc.
  
  // Emoji 💈 -> 💅
  c = c.replace(/\u{1F488}/gu, '\u{1F485}');
  // Also the HTML entity or text versions
  c = c.replace(/\uD83D\uDC88/g, '\uD83D\uDC85');
  
  // "Sua barbearia" -> "Seu salão"
  c = c.replace(/Sua sal\u00e3o/g, 'Seu sal\u00e3o');
  c = c.replace(/sua sal\u00e3o/g, 'seu sal\u00e3o');
  c = c.replace(/Nova sal\u00e3o/g, 'Novo sal\u00e3o');
  c = c.replace(/nova sal\u00e3o/g, 'novo sal\u00e3o');
  
  // "Adicionar Barbeiro" -> "Adicionar Profissional" (already done above)
  // "Editar Barbeiro" -> "Editar Profissional" (already done above)
  
  // Title in page
  c = c.replace(/<title>[^<]*<\/title>/i, '<title>ManiPro - Designer de Unhas</title>');

  fs.writeFileSync(p, c, 'utf8');
  const changed = c !== orig;
  console.log(f + ': ' + (changed ? 'UPDATED' : 'no changes') + ' (' + c.length + ' chars)');
});

console.log('\nDone! Rebrand complete.');
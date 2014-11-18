
$(function() {

/* TITLES */

$( "h3.titleHeatmap" ).html('Heatmap');
$( "h3.titleDotChart3h" ).html('I più menzionati nelle ultime 3 ore');
$( "h3.titleDotChart12h" ).html('I più menzionati nelle ultime 12 ore');
$( "h3.titleAreaChart12h" ).html('Festival delle Letterature vs Pescara');
$( "h3.titleBarChart1h" ).html("Hashtag più utilizzati nell'ultima ora");
$( "h3.titleBarChart12h" ).html('Hashtag più utilizzati nelle ultime 12 ore');
$( "h3.titleTopicsChart" ).html('Topics Chart');
/* DESCRIPTIONS */

var descriptionProject = "Il Database Group del <a href='http://www.polimi.it/' target='_blank'>Politecnico di Milano</a>, <a href='http://www.deib.polimi.it/' target='_blank'>Dipartimento di Elettronica, Informazione, e Bioingegneria</a>, lo <a href='http://skil.telecomitalia.com/' target='_blank'>SKIL Lab di Telecom Italia</a>  e <a href='http://liveon4g.tim.it' target='_blank'>LiveOn4G di TIM</a> , attraverso tecnologie d'analisi d’avanguardia (<a href='streamreasoning.org' target='_blank'>streamreasoning.org</a>) visualizzano graficamente in una nuova prospettiva l'andamento e l'intensità della conversazione su Twitter a Pescara durante il <a href='http://www.festivaldelleletterature.com/' target='_blank'>Festival delle Letterature</a>. Questo servizio è parte del progetto City Data Fusion for Event Management finanziato dalla action line su  <a href='http://www.eitictlabs.eu/innovation-areas/urban-life-and-mobility/' target='_blank'>Urban Life and Mobility degli EIT ICT Labs</a>.";
var descriptionSlider = "<small>Agendo sullo slider è possibile modificare l'istante temporale a cui si riferiscono i grafici</small>";
var descriptionHeatmap = "<small>Mappa che mostra l’intensità dell’attività social su Twitter geolocalizzata su Pescara. I colori (dal verde al rosso) indicano la concentrazione dei tweet (da bassa ad alta). <br /> Cliccando sul tasto con l'icona di Twitter verranno visualizzati dei Marker sulla mappa che indicano in modo puntuale la location di ogni singolo Tweet, con la possibilità di mostrarne il contenuto.</small>";
var descriptionDotChart3h = "<small>Il DotChart mostra la popolarità dei protagonisti del Festval delle Letterature su Twitter su un arco temporale di un'ora. Ogni 15 minuti il grafico viene aggiornato mostrando i 10 protagonisti più citati su Twitter.</small>";
var descriptionDotChart12h = "<small>Il DotChart mostra la popolarità dei protagonisti del Festval delle Letterature su Twitter su un arco temporale di 12 ore. Ogni ora il grafico viene aggiornato mostrando i 10 protagonisti più citati su Twitter.</small>";
var descriptionAreaChart12h = "<small>L’AreaChart mostra un confronto tra tutti i tweet che parlano dei protagonisti del Festval delle Letterature e i tweet di Pescara. Il grafico mantiene traccia dei conteggi per 12 ore con aggiornamenti ogni ora.</small>";
var descriptionBarChart1h = "<small>Il BarChart mostra i 15 hashtag più usati nei Tweet relativi al Festval delle Letterature. Il grafico riporta i conteggi relativi all'ultima ora, aggiornandoli ogni 15 minuti.</small>";
var descriptionBarChart12h = "<small>Il BarChart mostra i 15 hashtag più usati nei Tweet relativi al Festval delle Letterature. Il grafico riporta i conteggi relativi alle ultime 12 ore, aggiornandoli ogni ora.</small>";
var descriptionTopicsChart = "<small>Topics Chart</small>";


$( "p.descriptionProject" ).html(descriptionProject);
$( "p.descriptionSlider" ).html(descriptionSlider);
$( "p.descriptionHeatmap" ).html(descriptionHeatmap);
$( "p.descriptionDotChart3h" ).html(descriptionDotChart3h);
$( "p.descriptionDotChart12h" ).html(descriptionDotChart12h);
$( "p.descriptionAreaChart12h" ).html(descriptionAreaChart12h);
$( "p.descriptionBarChart1h" ).html(descriptionBarChart1h);
$( "p.descriptionBarChart12h" ).html(descriptionBarChart12h);
$( "p.descriptionTopicsChart" ).html(descriptionTopicsChart);

});

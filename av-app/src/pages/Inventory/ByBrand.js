import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, Offcanvas, Modal, Image } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import api from '../../api/axiosConfig';
import ImagePlaceholder from '../../img/ImagePlaceHolder.png';


const states = {
  USA: [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
  ],
  Mexico: [
    "Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua",
    "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Mexico City",
    "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo",
    "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz",
    "Yucatán", "Zacatecas"
  ]
};

function ByBrand() {
  const [data, setData] = useState([]);
  const [brand, setBrand] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalMessage, setModalMessage] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const handleCloseOffcanvas = () => setShowOffcanvas(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = (product, message, title) => {
    setSelectedProduct(product);
    setModalMessage(message);
    setModalTitle(title);
    setShowModal(true);
  };
  

  useEffect(() => {
    if (!brand) return;

    setIsLoading(true);
    api.get(`/api/Products/brand/${brand}`)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
        console.log('Total items:', response.data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
    console.log(brand);
  }, [brand]);

  
  const handleShowOffcanvas = (productId) => {
    api.get(`/api/Products/${productId}`)
      .then(response => {
        setSelectedProduct(response.data);
        setShowOffcanvas(true);
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error loading product details:', error);
      });
  };

  const predefinedMessage = (product) => `I'm interested in your ${product.title} 
  
Stock number: ${product.stock_num}`;

  const [country, setCountry] = useState('');
  const [stateOptions, setStateOptions] = useState([]);

  const handleCountryChange = (event) => {
    const selectedCountry = event.target.value;
    setCountry(selectedCountry);
    setStateOptions(states[selectedCountry] || []);
  };

  const brands = [ 
      "3M", "AALADIN", "ABB", "ABELL-HOWE", "ACCO", "ACCO WRIGHT", "ACCRA WIRE", "ACCU", "ACCURPRESS", "ACCURSHEAR", "ACE", "ACECO", "ACER", "ACL", "ACME", "ACRA", "ADDISON", "ADIRA", "ADVANCED", "ADVANCED MACHINE", "ADVANTAGE", "AEF", "AEM", "AEM/TIMESAVER", "AER CONTROL SYSTEMS", "AES", "AGET", "AGM", "AIDA", "AIR FEED INC.", "Air Ram", "AIR TECHNOLOGY SYSTEMS", "AIRAM", "AJAX", "AJAX ELECTRIC", "AJAX TOCCO", "AKER WADE", "AKYAPAK", "ALDONEX", "ALLEGHENY", "ALLEN", "ALLIANT", "ALLSTEEL", "ALLTRONICS", "ALM", "ALMCO", "ALNOR", "ALORIS", "ALPHA", "ALPHIL", "ALPINE", "AMADA", "AMD", "American", "AMERICAN INDUCTION", "AMERICAN LIFTS", "AMERICAN MSI", "American Pacemaker", "AMERICAN STEEL", "AMERICAN STEEL LINE", "AMET", "AMP", "AMT", "ANCHOR", "ANDERSON", "ANGOR", "ANJO", "ANVER", "APEX", "APPLETON", "APPLIED RECOVERY SYSTEMS", "APT", "ARBOR", "ARCO WARD", "ARDCOR", "ARISTO", "ARMSTRONG", "ARO", "ARONSON", "ARTOS", "ASC", "ASHLAND", "ASQUITH", "ATLANTIC", "ATLAS", "ATLAS COPCO", "AUTOMATIC FEED", "AUTOQUIP", "AVEY", "AWC", "AWS", "AXELSON", "AZIMUTH", "B & K", "BAC", "BAILEIGH", "BAIRD MACHINE", "BALANCE TECHNOLOGY", "BALEMASTER", "BANNER", "BARBER COLMAN", "BARNES", "BARRETT", "BAY CAST", "BCP", "BEATTY", "BECKER PUMPS", "BEHRINGER", "BELLISS & MORCOM", "BENCHMASTER", "BENDIX", "BENNETT", "BERRY INDUSTRIES", "BERTHIEZ", "BERTRAM", "BERTSCH", "BESLY", "BETENBENDER", "BETTER ENGINEERING", "BETTERMAN", "BETTS", "BINNS & BERRY", "BIRMINGHAM", "BISHAMON", "BISON", "BLANCHARD", "BLISS", "BLM", "BLUE LINE", "BLUE M", "BLUE VALLEY", "BOBCAT", "BOMAR", "BOSCH SURFTRAN", "BOSCHERT", "BOWERS", "BRADBURY", "BRADLEY", "BRATTAN", "BRIDGEPORT", "BRONX", "BROWN & BOGGS", "BROWN & SHARPE", "BRUDERER", "B-TEK", "BTM SAWS", "BUCKEYE", "BUDGIT", "BUFFALO", "BULLARD", "BURR BENCH", "BURR OAK", "BURRMASTER", "BUSHMAN", "BUTECH BLISS", "C & M", "C.M.", "CADY LIFTERS", "CALDWELL", "CANTON", "CARLSTAHL CRAFTSMAN", "CARLTON", "CARSON ENGINEERING", "CART CADDY", "CASCADE", "CASTEX", "CAT", "CATERPILLAR", "CECO", "CECOR", "CENTAURO", "CENTRAL MACHINERY", "CENTRO METALCUT", "C-F", "CFM", "CHALLENGER ELECTRICAL EQUIPMENT", "CHALLENGER LIFTS", "CHAMBERSBURG", "CHASE-LOGEMAN", "CHERRY", "CHESTER", "CHEVALIER", "CHEVROLET", "CHICAGO", "CHICAGO DREIS & KRUMP", "CHIYODA", "Cincinnati", "CINCINNATI BICKFORD", "CINCINNATI FAN", "CINCINNATI HYPRO", "CINCINNATI INC", "CINCINNATI MACHINES", "CINCINNATI MILACRON", "CINCINNATI MILACRON HEALD", "CLARK", "CLAUSING", "CLAUSING COLCHESTER", "CLAUSING KONDIA", "CLAUSING METOSA", "CLAUSING NARDINI", "CLEARING", "CLEARING NIAGARA", "CLEEREMAN", "CLEMCO", "CLEVELAND", "CLEVELAND TWIST DRILL", "CLIFTON", "CM", "CM LODESTAR", "COBALT", "COE", "COFFING", "COILMATIC", "COLLINS MICROFLAT", "COLLIS", "COLT", "COMACA", "COMPAIR", "CONCO", "CONRAC", "CONTROLLED AUTOMATION", "CONTROLLED POWER", "CONTRX", "CONWAY", "COOPER WEYMOUTH", "CORSTEEL", "COSEN", "COUTH", "CP MFG", "CRAFTSMAN", "CRAM-A-LOT", "CREST ULTRASONIC", "CROWN", "CSEPEL", "CSM", "CULLEN FRIESTEDT", "CUMBERLAND", "CUSHMAN", "CUSTOM", "CUTLER HAMMER", "CWP", "D.C. MORRISON", "DAEWOO", "DAH LIH", "DAHLSTROM", "DAITO", "DAKE", "DAKE MEP", "DALCOS", "DALLAS", "DANLY", "DARBERT", "DAVENPORT", "DAVEY", "DAVI", "DAYTON", "DE LAVAL", "Decapador", "DEFIANCE", "DELTA", "DEMAG", "DENGENSHA", "DENISON", "DENISON MULTIPRESS", "DENYO KOGYO", "DETROIT", "DEVAIR", "DEWALT", "DIACRO", "DIAMOND", "DICKERMAN", "DIGIT", "DILLON", "DIMECO ALIPRESSE", "DIMETRICS", "DIVINE", "DMG MORI", "DMK", "DOALL", "DOALL ROMI", "DODGE", "DONALDSON", "DONALDSON TORIT", "DOOSAN", "DORIAN TOOL", "DOVER", "DREISTERN", "DRI-AIR", "DTI", "DUFF NORTON", "DUNNAGE", "DURANT", "DURMA", "DUST CONTROL", "DUST HOG", "DYNAMIC AIR", "DYNAMIC FEEDS", "E.H. WACHS", "EAGLE", "EASTEY", "EASTMAN", "EATON", "EATON LEONARD", "ECONOLINE", "EDWARDS", "EGAN", "EITEL", "ELB", "ELGIN", "ELM SYSTEMS", "EMI", "ENCO", "ENERPAC", "ENGEL", "ENSHU", "ENTERPRISE", "ENVIRO-PAK", "ENVIROTRONICS", "ERIE", "ERIEZ MAGNETICS", "ESAB", "EUBANKS", "EVANS", "EVAPCO", "EVERETT", "EXCEL", "EXCELLO", "EXTRUDE HONE", "FABRILINE", "FACCIN", "FALK", "FALLS", "FAMCO", "FANUC", "FARO", "FARR", "FARREL", "FASTENER ENGINEERS", "FASTI", "FEDERAL", "FEDERAL PACIFIC", "FEED LEASE", "FELDMAN", "FELLOWS", "FENN", "FH", "FICEP", "FIDIA", "FILTER 1", "FIM", "FINNSONIC", "FLOW", "FMB", "FORD", "FORSTNER", "FORTE", "FORTUNE", "FOSDICK", "FOSTORIA", "FOUR CORP", "FRANKLIN", "FRITZ WERNER", "FRONIUS", "FRORIEP", "G & L", "G&E", "G&P", "GAFFEY", "GALAXY", "GALBREATH", "GARDNER", "GARDNER DENVER", "GARY", "GATTI", "GAUER", "GE SCHMIDT", "GEKA", "GEMINIS", "GENERAL AIR", "GENERAL BATTERY CHARGER", "GENERAL ELECTRIC", "GENIE", "GIDDINGS & LEWIS", "GIDDINGS & LEWIS BICKFORD", "GIDDINGS & LEWIS FRASER", "GIORIA", "GISHOLT", "GLEASON", "GLEBAR", "GLOBE TUMBLER", "GLUCO", "GMC", "GOFF", "GOLDSPRING", "GORBEL", "GOULD", "GOULD & EBERHARDT", "GPI", "GRANITE", "GREAT LAKES", "GREAT WALL", "GREENARD", "GREENLEE", "GRENEN", "GRIEVE", "GRIZZLY", "GROB", "GROTNES", "GRUENDLER", "GSW", "GUIDETTI", "GULLCO", "GUTMANN", "GUYSON", "HAAS", "HACK", "HAEUSLER", "HAMILTON", "HAMMOND", "HAMMOND POWER SOLUTIONS", "HAMMOND ROTO-FINISH", "HANKISON", "HANNIFIN", "HARDINGE", "HARIG", "HARLEY", "HARMONY", "HARRINGTON", "HAUSER", "HAUTAU", "HAVEN", "HE&M", "HEALD", "HEAT SEAL", "HEATING INDUCTION SERVICES", "HEIAN", "HEIM", "HEINRICH", "HELLER", "HEM", "HERCULES", "HERCULES AJAX", "HERMAN SCHWABE", "HERR VOSS", "HEVI DUTY", "HGG", "HI VAC", "HIGHLIGHT INDUSTRIES", "HILL-ACME", "HILTI", "HINES", "HITACHI", "HITRAN", "HI-VAC", "HMTW", "HOBART", "HOFFMANN", "HPM", "HTC", "HTC HYDRA-TOOL", "HTF", "HTI ENGINEERING", "HUESTIS", "HURCO", "HURRICANE", "HURST", "HUSKY", "HUTH", "HWACHEON", "HYDMECH", "HYD-MECH", "HYDRO TEK", "HYDROSCALE", "HYPERTHERM", "HYSTER", "HYTROL", "I2S", "I2S INTEGRATED INDUSTRIAL SYSTEMS", "IDEAL STITCHER", "IDEX", "IKEDA", "IMCAR", "IMPERIAL", "IMS", "INDUCTOHEAT", "INDUSTRIAL", "INGAR", "INGERSOLL-RAND", "INTERLAKE", "IOWA PRECISION", "IPS", "IRCO AUTOMATION", "IZPE", "JACO", "JACOBS", "JAYBIRD", "JENFAB", "JET", "JET EDGE", "JETLINE", "JLG", "JMT", "JOHN DEERE", "JOHN DUSENBERY", "JOHNFORD", "JONES & LAMSON", "JONES & SHIPMAN", "JORNS AG", "JOYCE CRIDLAND", "K & T", "KAESER", "KALAMAZOO", "KANE & ROACH", "KARCHER", "KASTO", "KAUKAUNA", "KEARNEY & TRECKER", "KECKLEY", "KEINS", "KEIYO", "KENT", "KERRY", "KIA SEIKI", "KIKINDA", "KINEFAC", "KINGSLAND", "KINGSWAY", "KJELLBERG", "KLING", "KMF", "KNAACK", "KNUDSON", "KNUTH", "KOEPFER", "KOIKE ARONSON", "KOMATSU", "KONE", "KONECRANES", "KRANCO", "KRB", "KUNDEL", "KURT", "L & J", "L&J", "LAGUN", "LAKE ERIE", "LAKE SHORE TABLES", "LAMINA", "LANDA", "LANDIS", "LANSING", "LASCO", "LEADWELL", "LEBLOND", "LEBLOND REGAL", "LEITZ", "LEPEL", "LEROI", "LEWCO", "LEWIS", "LEXAIR", "LIAN FENG", "LIBERTY", "LIBURDI DIMETRICS", "LIEBHERR", "LIFT COMPANY", "LINCOLN", "LINCOLN ELECTRIC", "LINDBERG", "LITTELL", "LNS", "LOCKFORMER", "LODGE & SHIPLEY", "LOOPCO", "LUBOW", "LUCAS", "LVD", "LYNDEX NIKKEN", "LYON", "MACHINE CONCEPTS", "MACRODYNE", "MAGNAFLUX", "MAGNATECH", "MAKINO", "MANCHESTER", "MANNOR", "MANSAVER", "MANVILLE", "MARATHON", "MAR-BEL", "MARCO", "MARCUS", "MAREN", "MARQUETTE", "MARVEL", "MASTER CHEMICAL", "MASTER MACHINE", "MATTISON", "MAXIMIZER", "MAX-O", "MAX-PAK", "MAYPRESS", "MAZAK", "MCKAY", "MCKEE", "MEASUREMENT SYSTEMS", "MECON", "MEDART", "MEDINA", "MEECO", "MEMCO", "MERCURY", "MESSER", "METAL MECHANICS", "MEUSER", "MG AMERICA", "MGM", "MICROCUT", "MIDWEST", "MIDWEST AUTOMATION", "MILLER", "MILLTRONICS", "MILWAUKEE", "MINSTER", "MINUTEMAN", "MISSLER", "MITCHELL", "MITSUBISHI", "MITSUBISHI ELECTRIC", "MITSUBISHI FORKLIFT", "MITSUI", "MITTS & MERRILL", "MITUTOYO", "MIYANO", "MODERN", "MODERN HYDRAULIC CORP", "MOHAWK", "MONARCH", "MONTGOMERY", "MORI", "MORRISON COMPANY", "MORSE", "MORSE CUTTING TOOLS", "MOSSBERG", "MOTIVATION", "MOTOMAN", "MSI", "MTC", "MUBEA", "MULTIPRESS", "MULTIVAC", "NACHI", "NARDINI", "NATCO", "National", "NATIONAL MAXIPRESS", "NEW HOLLAND", "NEW LONDON", "NEWBURY", "NIAGARA", "NIKKEN", "NILES", "NILFISK ADVANCE", "NILSON", "NISSAN", "NISSEI", "NOBLES", "NOMURA", "NORDSON", "NORTH AMERICAN", "NORTON", "NSK", "NSS", "NUMATIC", "OAK", "OAK PRESS", "OGDEN", "OILGEAR", "OKAMOTO", "OKUNA", "OLIVER", "OMCG", "OMEGA", "OMRON", "ORBITAL SYSTEMS", "ORION", "ORWAK", "OSTER", "P & H", "P&H", "PA INDUSTRIES", "PABCO", "PACIFIC", "PANASONIC", "PANDJIRIS", "PANGBORN", "PARKER", "PARKER HANNIFIN", "PATTERSON", "PATTERSON-KELLEY", "PAXSON", "PEARSON", "PEDDINGHAUS", "PEDRAZZOLI", "PEER", "PEERLESS", "PENTALIFT", "PERFECT", "PERFECTO", "PERKINS", "PERMADUR", "PEXTO", "PFAUTER", "PHASE II", "PILLAR", "PINES", "PIONEER", "PIONEER ECLIPSE", "PIQUA", "PIRANHA", "PNEU POWR", "POLAND", "POREBA", "PORTAGE", "PORTER CABLE", "POWER TEAM", "POWERMATIC", "POWERTRAN", "PRATT & WHITNEY", "PRE DALLAS", "PRECISE", "PRECISION", "PRECISION GRANITE", "PRECISION INDUSTRIES", "PRECISION QUINCY", "PRESS ROOM EQUIPMENT", "PRESTO", "PRESTON EASTIN", "PRIMA", "PRIMELINE", "PRO GUARD", "PRO WELD", "PROCECO", "PRODUCTION", "PROFILE", "PROGRESSIVE", "PROMACUT", "PRO-NOTCH", "PROSERV", "PROTEM", "PROTO-1", "PTR", "PULLMAX", "PUTNAM", "PYROMAITRE", "Q-FOG", "QUANTUM", "QUINCY", "RADIAC ABRASIVES", "RADIUS", "RAFTER", "RAHN", "RAMCO SANDERS", "RANGER", "RANSOHOFF", "RANSOME", "RAPID AIR", "RAS", "RAYTECH", "RBI", "RED BUD", "REED", "REGAL", "REISHAUER", "RENEGADE", "REPUBLIC", "REVOLATOR", "RICE LAKE", "RICHARDS", "RIDGID", "RIFA", "RMG", "RMS", "ROACH", "ROBBINS & MYERS", "ROBOTOOL", "ROBOVENT", "ROCKFORD", "ROD CHOMPER", "RODGERS", "ROFIN", "ROFIN LASAG", "ROMI", "ROSEMONT", "ROSLER", "ROTARY", "ROTO DIE", "ROTO-FINISH", "ROUNDO", "ROURA", "ROUSELLE PRESS", "ROUSSELLE", "ROWE", "ROYAL", "ROYAL MASTER", "ROYALTON", "ROYSON", "RUESCH", "RUF", "RUSH", "RYAZAN", "RYMAN", "SACK & KIESSELBACH", "SAFAN", "SALA", "SAMPUTENSILI", "SANDVIK", "SANYO DENKI", "SATEC SYSTEMS", "SAVAGE", "SAVAGE SAWS", "SCHIESS FRORIEP", "SCHLEBACH", "SCHMIDT", "SCHUNK", "SCHUSTER", "SCIAKY", "SCOTCHMAN", "SCOTSMAN", "SCS", "SEFAC LIFT & EQUIPMENT", "SELCO", "SELMA", "SENTRY EQUIPMENT", "SERTOM", "SERVICE", "SERVO", "SESCO", "SETCO", "SHAANXI", "SHARP", "SHAW", "SHEET METAL MEN", "SHELDON", "SHIBAURA", "SHIGIYA", "SHUSTER", "SIDNEY", "SIEMENS", "SIGMA MACHINERY", "SIGNODE", "SIMASV", "SIMONDS", "SINTOBRATOR", "SIRCO", "SMART", "SMC", "SMEC", "SMERAL", "SMS HASENCLEVER", "SMTW", "SOCO", "SORGEL", "SOUTH BEND", "SOUTH BEND JOHNSON", "SOUTHWESTERN INDUSTRIES", "SOUTHWORTH", "SPANCO", "SPANG", "SPARTAN", "SPRINGFIELD", "SPX", "SQUARE D", "STAHL", "STAHL CRANE SYSTEMS", "STAMTEC", "STANAT", "STANCO", "STANDARD INDUSTRIAL", "STANLEY", "STANLEY BOSTITCH", "STANLEY VIDMAR", "STARRETT", "STARTRITE", "STEEL STORAGE SYSTEMS", "STEELE", "STEELTRAK", "STEELWELD", "STEINWEG", "STERLING", "STERLING HVAC", "STERTIL KONI", "STEWART SYSTEMS", "STONE", "STORCH", "STORM VULCAN", "STREET", "STRIPPIT", "STUDER", "STUHR", "SULLAIR", "SUMMIT", "SUNDSTRAND", "SUNNEN", "SUPERMAX", "SUPERTEC", "SUTTON", "SWECO", "SWI", "SYNERGY", "SYSTEM TECHNOLOGIES", "T & H", "TAIHE(TAH)", "TANNEWITZ", "TARNOW", "TAURING", "TAYLOR", "TAYLOR DUNN", "TAYLOR WINFIELD", "TCM", "T-DRILL", "TEAM", "TECHNITRON", "TENNANT", "TENNSMITH", "THEMAC", "THERMAL DYNAMICS", "THERMATRON", "THERMOTRON", "THERN", "THOMPSON", "TILT-LOCK", "TIMEMASTER", "TIMESAVERS", "TISHKEN", "TITAN", "TOCCO", "TOLEDO", "TOLEDO SCALE", "TONGTAI", "TORIN", "TORIT", "TORO", "TORRINGTON", "TOS", "Toshiba", "TOSHIBA SHIBAURA", "TOYOTA", "TPI", "TRACKMOBILE", "TREE", "TRENNJAEGER", "TRIAD", "TRIANGLE", "TRIUMPH", "TROYKE", "TRUMPF", "TRUMPH WAFIOS", "TRU-STONE", "TSI", "TSUGAMI", "Turbo", "TURNER", "U.S. BAIRD", "ULINE", "ULTRA GRIP INTL", "ULTRA KOOL", "ULTRAMATIC", "UNICO", "UNION", "UNIPUNCH", "UNITED AIR SPECIALISTS", "UNIVAC", "UNIVERSAL", "UNKNOWN", "US INDUSTRIAL", "USI", "UTE", "UTILITY", "V&O", "VAC-U-MAX", "VALDARNO", "VALENITE", "VAN NORMAN", "VAN STEENBURGH", "VANGUARD", "VANTAGE", "VARGUS", "VAUGHN", "VERNON TOOL", "VERSON", "VERSON WHEELON", "VESTIL", "VIBRA", "VIBRO DYNAMIC", "VICTAULIC", "VICTOR", "VIKING", "VOLVO", "VOORTMAN", "Voss", "VULCAN", "W.A. WHITNEY", "W.F. WELLS", "WAGNER", "WALKER", "WALL COLMUNOY", "WALLACE", "WALLACE COAST", "WALLNER", "WALSH", "WALTER", "WARD", "WARDCRAFT", "WARNER", "WARNER & SWASEY", "WASINO", "WATERBURY", "WATERBURY FARREL", "WATLOW", "WATSON STILLMAN", "WAUSEON", "WDM", "WEAN", "WEBB", "WEBER", "WEBSTER & BENNETT", "WEIGH-TRONIX", "WELD ENGINEERING", "WELDWIRE", "WELLS", "WELLSAW", "WELTY WAY", "WESCO", "WEST BEND", "WESTINGHOUSE", "WHEELABRATOR", "WHITE", "WHITING", "WHITNEY", "WHITNEY JENSEN", "WILLIAMS", "WILLIAMS & WHITE", "WILLIS", "WILSON", "WILSON TUKON", "WISCONSIN OVEN", "WMW", "WOOD", "WORTHINGTON", "WOTAN", "WRIGHT", "WTC", "WYSONG", "WYSONG & MILES", "YALE", "YAM", "YIFANG", "YODER", "YUASA", "ZEISS", "ZEP", "ZERO", "ZOLLER"
  ];

  return (
    <div>
    <Header/>
    <Container fluid className='main-container pt-2'>
      <Container fluid className='py-3'>
        <Form.Select aria-label="Select brand" onChange={e => setBrand(e.target.value)}>
          <option selected disabled>Select a brand</option>
          {brands.map((brand, index) => (
            <option key={index} value={brand}>{brand}</option>
          ))}
        </Form.Select>
      </Container>

      {brand === "" ? (
         !isLoading ? (
          <h6>Please select a brand.</h6>
        ) : (
          <Container className='text-center p-5'>
            <Spinner animation="border" variant="primary" role="status" style={{width: 50, height: 50}}/>
          </Container>
        )
      ) : (
        <Row xs={1} sm={2} md={3} lg={4} className="g-4 pb-3">
            {data.map((item, idx) => (
              <Col key={idx}>
                <Card style={{ width: '18rem', height: '34rem' }}>
                  <Card.Img variant="top" src={item.image && item.image !== "NULL" ? item.image : ImagePlaceholder} height={200} width={200}/>
                  <Card.Body>
                    <Card.Title as={'h6'}>{item.title}</Card.Title>
                    <Card.Text as={'h6'}><b>Stock #</b> {item.stock_num}</Card.Text>
                    <Card.Text as={'h6'}><b>Type: </b>{item.type}</Card.Text>
                  </Card.Body>
                  <Card.Footer >
                    <Row className='g-2'>
                      <Button variant="success" onClick={() => handleShowModal(item, `I'd like to make an offer of:\n\n${predefinedMessage(item)}`, "Make an Offer")}>MAKE AN OFFER</Button>
                      <Button variant="outline-warning" onClick={() => handleShowModal(item, predefinedMessage(item), "Request a Quote")} style={{color: 'black'}}>Request Quote</Button>
                      <Button onClick={() => handleShowOffcanvas(item.stock_num)} variant="primary">View Details</Button>
                    </Row>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
      )}
    </Container>

    
    <Offcanvas show={showOffcanvas} onHide={handleCloseOffcanvas} placement='end' style={{ width: '75%'}}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Product Details</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {selectedProduct ? (
            <div>
              <Container className='text-center pb-3'>
                <Image src={selectedProduct.image && selectedProduct.image !== "NULL" ? selectedProduct.image : ImagePlaceholder} className="img-fluid" style={{maxHeight: '300px', objectFit: 'cover'}}/>
              </Container>
              <Card>
                <Card.Body>
                  <Card.Title as="h4" className='fw-bold'>{selectedProduct.title}</Card.Title>
                  <Row>
                    <Col>
                      <Card.Text as={'h6'}><b>Stock #</b> {selectedProduct.stock_num || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Type: </b> {selectedProduct.type || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Brand: </b> {selectedProduct.brand || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Model: </b> {selectedProduct.model || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Serial Number: </b> {selectedProduct.serial_num || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Condition: </b> {selectedProduct.condition || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Year: </b> {selectedProduct.year || 'N/A'}</Card.Text>
                    </Col>
                    <Col>
                      <Card.Text as={'h6'}><b>City: </b> {selectedProduct.city || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>State: </b> {selectedProduct.state || 'N/A'}</Card.Text>
                      <Card.Text as={'h6'}><b>Zip Code: </b> {selectedProduct.zipCode || 'N/A'}</Card.Text>
                    </Col>
                  </Row>
                </Card.Body>
                <Card.Footer>
                  <Row className='g-1'>
                    <Button variant="success" onClick={() => handleShowModal(selectedProduct, `I'd like to make an offer of:\n\n${predefinedMessage(selectedProduct)}`, "Make an Offer")}>MAKE AN OFFER</Button>
                    <Button variant="outline-warning" onClick={() => handleShowModal(selectedProduct, predefinedMessage(selectedProduct), "Request a Quote")} style={{color: 'black'}}>Request Quote</Button>
                  </Row>
                </Card.Footer>
              </Card>
            </div>
          ) : <p>Loading...</p>}
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row className='pb-3'>
              <Col md={6}>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your first name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formLastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter your last name" />
                </Form.Group>
              </Col>
            </Row>

            <Row className='pb-3'>
              <Col md={6}>
                <Form.Group controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Enter your phone number" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your email" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className='pb-3'>
              <Col md={6}>
                <Form.Group controlId="formCompany">
                  <Form.Label>Company</Form.Label>
                  <Form.Control type="text" placeholder="Enter your company name" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formStreetAddress">
                  <Form.Label>Street Address</Form.Label>
                  <Form.Control type="text" placeholder="Enter your street address" required />
                </Form.Group>
              </Col>
            </Row>

            <Row className='pb-3'>
              <Col md={6}>
                <Form.Group controlId="formCountry">
                  <Form.Label>Country</Form.Label>
                  <Form.Select value={country} onChange={handleCountryChange}>
                    <option value="">—Please choose a country—</option>
                    <option value="USA">United States</option>
                    <option value="Mexico">Mexico</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formState">
                  <Form.Label>State</Form.Label>
                  <Form.Select disabled={!stateOptions.length}>
                    <option value="" disabled>—Please choose a state—</option>
                    {stateOptions.map((state, idx) => (
                      <option key={idx} value={state}>{state}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className='pb-3'>
              <Col md={6}>
                <Form.Group controlId="formCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control type="text" placeholder="Enter your city" />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="formZipCode">
                  <Form.Label>Zip Code</Form.Label>
                  <Form.Control type="text" placeholder="Enter your zip code" required />
                </Form.Group>
              </Col>
            </Row>           

            <Form.Group controlId="formNewsletter" className='pb-3'>
              <Form.Check type="checkbox" label="Sign up for newsletter" />
            </Form.Group>

            <Form.Group controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={3} required value={modalMessage} style={{height: 180}}/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ByBrand;

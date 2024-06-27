import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Form, Offcanvas, Image, Modal } from 'react-bootstrap';
import Header from '../../components/Header/Header';
import api from '../../api/axiosConfig';
import ImagePlaceholder from '../../img/ImagePlaceHolder.png';
import Footer from '../../components/Footer/Footer';


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

function ByType() {
  const [data, setData] = useState([]);
  const [type, setType] = useState('');
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
    if (!type) return;

    setIsLoading(true);
    api.get(`/api/Products/type/${type}`)
      .then(response => {
        setData(response.data);
        setIsLoading(false);
        // console.log('Total items:', response.data.length);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
    console.log(type);
  }, [type]);

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

  const types = [
    "Accumulators", "Air Cleaners", "Air Compressors", "Air Compressors, Centrifugal", 
    "Air Compressors, Cylinder", "Air Compressors, Dryers", "Air Compressors, Portable", 
    "Air Compressors, Reciprocating. Lub.", "Air Compressors, Rotary Screw/Sliding Vane", 
    "Air Compressors, Tank Mounted", "American Tooling/Dies", "Angle Plates", 
    "Assembly Machines", "Automated Welding Systems", "Automatic Chuckers, Mult. Spdl", 
    "Axis Drives", "Backgauges", "Balancers", "Balers", "Ballscrews", "Banding Machinery/Lines", 
    "Bar Feeds", "Bar Turners / Peelers", "Battery Chargers", "Beaders", "Beam / Drill Lines", 
    "Beam Coping Machines", "Belts", "Bench Centers", "Benders, Beam & Straightening", 
    "Benders, Hand", "Benders, Hydraulic", "Benders, Pipe, Tube & Bar", "Benders, Rebar", 
    "Benders, Return", "Benders, Rod", "Benders, Shape", "Benders, Tangent", 
    "Benders, Tube, Electric", "Bevelers", "Billet Heaters", "Bin and Tote Handling", 
    "Binding Equipment", "Bins", "Blades", "Blanking Lines", "Blast Cleaning", "Blenders", 
    "Blowers", "Bolster Plates", "Bolt Threaders", "Boring Bars", "Boring Heads", 
    "Boring Machines, Horizontal", "Boring Mills, Horizontal, Floor Type", 
    "Boring Mills, Horizontal, Table Type", "Boring Mills, Portable", "Boring Mills, Vertical", 
    "Box Trucks", "Boxes, Tote", "Brakes, Apron", "Brakes, Box & Pan (incld Finger)", 
    "Brakes, Hydraulic", "Brakes, Mechanical", "Brakes, Parts, Tooling & Accessories", 
    "Brakes, Press", "Briquetters, Hydraulic", "Bulldozers", "Burnishing Machines", 
    "Bus Bars & Plugs", "Cabinets", "Cardboard Equipment", "Cart", "Centering Reels", 
    "Chamfering Machines", "Chillers", "Chip Processing Systems", "Chip Wringers", 
    "Chucks", "Chucks, Parts, Tooling & Accessories", "Clamps", "Cleaners", "Cleaning Tanks", 
    "CNC & N/C Controls", "CNC Machines", "Coil Cars", "Coil Cradles", "Coil Cradles & Straighteners", 
    "Coil Feed Lines", "Coil Feeders", "Coil Lifters", "Coil Reels and Straighteners", 
    "Coil Spreaders", "Coil Straighteners", "Coil Tension Stands", "Collet Chucks & Fixtures", 
    "Collets", "Combo 3-in-1 Sheet Metal Machines", "Compactors", "Comparators, Optical", 
    "Complete Plants", "Construction, Earth Moving Equipment", "Containers", 
    "Continuous Chain Broaches", "Controls, Cabinet/ Pendant", "Controls, Motor", 
    "Conveyor", "Conveyors", "Conveyors, Accumulators, Rotary Table", "Conveyors, Belt", 
    "Conveyors, Belt Driven Live Roller", "Conveyors, Belt Incline", "Conveyors, Cleated Incline", 
    "Conveyors, Roller", "Conveyors, Sortation, Laning, Orienting and Transfer", 
    "Coolant Filtering Systems", "Coolant System", "Coolant Systems (High Pressure)", 
    "Coolers", "Cooling Towers", "Coordinate Measuring Machines", "Corner Formers", 
    "Corrugated Metal Machinery", "Crane Accessories", "Crane Runways", "Cranes, Accessories", 
    "Cranes, Bridge & Overhead", "Cranes, Gantry, Bridge Type", "Cranes, Hoists", 
    "Cranes, Jib", "Cranes, Straddle Carrier", "Cranes, Underrunning", "Crimpers", 
    "Cut To Length Lines", "Cut-offs, Press Type", "Cut-Offs, Tube, Pipe & Bar", "Cutters, Tube", 
    "Cutting Machines", "Cylinders", "Deburring Machines", "Definite Purpose Motors", 
    "Demagnetizers", "Diamond Dressers", "Die Casting Machines", "Die Handlers/Flippers", 
    "Die Heads", "Die Holders", "Die Lift Carts", "Dies, Press Brake", "Disintegrators", 
    "Dividing Heads", "Draw Benches", "Drill Heads", "Drill Sharpeners", 
    "Drilling & Tapping Machines", "Drills", "Drills, Carbide", "Drills, Gang", "Drills, Gear Head", 
    "Drills, Heavy Duty - Multi Spdl (incl. Gang & Cluster)", 
    "Drills, Heavy Duty & Sensitive, Single Spindle", "Drills, Jobber Length", 
    "Drills, Parts & Accessories", "Drills, Portable (including Magn. Base)", "Drills, Radial", 
    "Drills, Straight Shank", "Drills, Taper Shank", "Drills, Upright", 
    "Drum and Barrel Handling", "Dryers", "Dust Collectors", "Dust Collectors, Downdraft", 
    "Dust Collectors, Pulse bag", "Dust Collectors, Shaker", "Edgers", "EDM, Wire", 
    "Elbow Machines", "Electrical Equipment, Miscellaneous", "Electrical, Control Panels", 
    "Embossing Machines", "End Mills", "Environmental Chambers", "Expanders", "Face Mills", 
    "Face Plates", "Facing & Centering Machines", "Feeders", "Feeders, Air", "Feeders, Bowl", 
    "Feeders, Servo", "Feeders, Sheet", "Feeders, Slide Type", "Feeders, Vibratory", 
    "Feeding & Straightening Machines", "Film Winders", "Finishing Machines", 
    "Fire Extinguishers", "Flangers", "Floor Scarifiers", "Folding Machines", 
    "Forging Equipment", "Forging Hammers", "Forging Manipulators", "Forging Presses", 
    "Forging Rolls", "Forklift Attachments", "Forklift Trucks", "Fume Extractors", "Furnaces", 
    "Furnaces, Induction Heating", "Furnaces, Roller Hearth", "Gas Heaters", "Gear Accessories", 
    "Gear Finisher", "Gear Generators", "Gear Hobbers", "Gear Miscellaneous, Parts, Tooling & Accessories", 
    "Gear Rollers", "Gear Shapers", "Gearboxes", "Generators", "Granite Surface Plates", 
    "Gravity Rollers", "Grinders", "Grinders, Bearing Race", "Grinders, Belt (Incl Sanders)", 
    "Grinders, Broach", "Grinders, Camshaft", "Grinders, Centerless", "Grinders, CNC", 
    "Grinders, Crankshaft", "Grinders, Cylinder", "Grinders, Cylindrical (Incl Plain & Angle Head)", 
    "Grinders, Cylindrical, Universal", "Grinders, Disc", "Grinders, Drill", "Grinders, Head", 
    "Grinders, Internal", "Grinders, Jig", "Grinders, Pedestal Type (Double End)", "Grinders, Roll", 
    "Grinders, Surface", "Grinders, Surface, Horizontal", 
    "Grinders, Surface, Horizontal, Recip Table, CNC", "Grinders, Surface, Recip.", 
    "Grinders, Surface, Rotary", "Grinders, Swisher", "Grinders, Thread", "Grinders, Tool Post", 
    "Grinders, Valve", "Grinders, Vertical Universal", "Grinding Attachments & Heads", 
    "Grinding Wheels", "Grooving Machines", "Hammers, Parts", "Hand Presses", 
    "Hardening Machines", "Headstocks / Tailstocks", "Heat Exchangers", "Heaters, Electric", 
    "Hoists (All Types)", "Hones", "Hones, Horizontal", "Honing Accessories", "Hoppers", 
    "Horizontal Baler", "Horizontal Broaches", "Hot Runner Controllers", 
    "Hot Water and Low Pressure Steam Boilers", "Hydraulic Power Units", "Ice Machines", 
    "Induction Heaters", "Infrared Heaters", "Injection Molding Machines", "Inspection Equipment", 
    "Inspection Machines, Magnetic", "Ironworkers", "Isolation Pads", "Jaws", "Jig Borers", 
    "Keyseaters", "Knee Mills", "Laboratory, Research Equipment", "Lappers", "Laser Cutters", 
    "Laser Load/Unload Systems", "Lasers, CNC", "Lasers, Tube Cutting", "Lathes, Bearing Ring", 
    "Lathes, Bench Top", "Lathes, Chucking, Manual", "Lathes, CNC", "Lathes, CNC (3-Axis or More)", 
    "Lathes, Engine", "Lathes, Flat Bed, CNC", "Lathes, Gap", "Lathes, Oil Field & Hollow Spindle", 
    "Lathes, Servo/Conventional", "Lathes, Threading-Automatic, Single Point", 
    "Lathes, Toolroom", "Lathes, Turret", "Lathes, VTL (Vertical Turret Lathe)", 
    "Lathes, Welding", "Lathes, Wheel", "Levelers", "Lifters", "Lifters, Aerial", "Lifters, Automotive", 
    "Lifters, Electric", "Lifters, Jack", "Lifters, Platform", "Lifters, Scissor", "Lifters, Sheet", 
    "Lifting Beams", "Lifting Frames", "Lifting Magnets", "Light Curtains & Grids", 
    "Machining Centers, Horizontal", "Machining Centers, Universal", 
    "Machining Centers, Vertical", "Machining Centers, Vertical, (5-Axis or More)", 
    "Magnetic Chucks", "Magnets", "Magnets, Crane", "Maintenance Carts", "Manipulators", 
    "Manlifts", "Marking Machines", "Material Dryers, Desiccant", "Material Feeder", 
    "Material Handling Equipment", "Measuring Machines", "Micrometers", "Millers, Flute", 
    "Millers, Horizontal", "Millers, Knee, CNC", "Millers, Portable", "Millers, Production, Duplex", 
    "Millers, Production, Simplex (Hor.)", "Millers, Ram Type, Horiz & Vert", "Millers, Vertical", 
    "Millers, Vertical & Horizontal", "Milling & Drilling Machines (Combo)", 
    "Milling Attachments & Heads", "Milling Chucks", "Milling Cutters", "Milling Machines, Tool", 
    "Mills, CNC", "Miscellaneous", "Mist Collectors", "Mixers", "Mobile Cranes", "Motor Graders", 
    "Motors, A.C.", "Motors, D.C.", "Motors, Hydraulic", "Nailing Machines", 
    "New Standard Tooling/Dies", "Nibblers", "Notching Machines", "Numerical Control & Boards", 
    "Office Equipment", "Oil & Chip Recovery Systems", "Oil Separators", "Other Cutting Tools", 
    "Other Press Brake Tooling", "Ovens", "Ovens, Batch", "Ovens, Continuous", "Ovens, Conveyor", 
    "Ovens, Electric", "Paint Systems & Equipment (Incl. Powder Coating Lines)", "Pallet Decoilers", 
    "Pallet Inverter", "Pallet Jacks", "Pallet Lift", "Palletizers", "Paper Punches", "Paper Shredders", 
    "Parts", "Parts Feeders", "Pipe Flangers", "Pipe Machinery", "Pipe Machinery, Bucking Machines", 
    "Pipe Testers, Hydrostatic", "Pipe Threaders", "Plant Support Equipment", "Plasma Cutters", 
    "Plasma Cutters, CNC", "Plastic Molding", "Plastics Machinery, Parts, Tooling & Accessories", 
    "Plate Processors", "Polishing Machinery (Incl Buffers)", "Power Conditioners", "Power Supplies", 
    "Presses, Accessories", "Presses, Air", "Presses, Baling", "Presses, Blanking", 
    "Presses, Briquetting, Hydraulic, Cylindrical", "Presses, C-Frame", "Presses, Clicker", 
    "Presses, Crimping", "Presses, Cut-Off", "Presses, Die Tryout & Spotting", 
    "Presses, Double & Triple Action", "Presses, Drill", "Presses, Fluid Forming", 
    "Presses, Forming", "Presses, Gap Frame (OBS)", "Presses, H-Frame", "Presses, High Speed Production", 
    "Presses, Hobbing", "Presses, Horizontal", "Presses, Hydraulic", "Presses, Knuckle Joint", 
    "Presses, Mechanical", "Presses, Molding", "Presses, O.B.I, Back Geared, Single Crank", 
    "Presses, O.B.I, Flywheel, Single Crank", "Presses, O.B.I.", "Presses, Pneumatic", "Presses, Punch", 
    "Presses, Reducing", "Presses, Rubber Pad", "Presses, Stamping", "Presses, Straight Side", 
    "Presses, Straight Side, Double Crank (Double Action)", 
    "Presses, Straight Side, Double Crank (Single Action)", "Presses, Straight Side, Single Crank", 
    "Presses, Straightening", "Presses, Swaging", "Presses, Toggle, Double Action", "Presses, Transfer", 
    "Presses, Trimming", "Presses, Welder", "Presses, Wheel", "Pressure & Steam Washers", 
    "Printed Circuit Board Equipment", "Profilers", "Prototype Manufacturing Machines", "Pumps", 
    "Pumps, Centrifugal", "Pumps, Hydraulic", "Pumps, Vacuum", "Punches, Angle", "Punches, Beam Lines", 
    "Punches, Fabricating", "Punches, Parts, Tooling & Accessories", "Punches, Portable", 
    "Punches, Single End", "Punches, Turret", "Punching & Shearing Cells", "Punch-Shears, Ironworkers", 
    "Racks/Shelving", "Reamers", "Refrigeration Units", "Ring Formers", "Riser Blocks", "Riveters", 
    "Robots", "Robots, Servo", "Roll Formers", "Rolling Mills", "Rolling Mills, 2-HI", "Rolling Mills, 4-HI", 
    "Rolling Mills, Embossing", "Rolls, Angle Bending", "Rolls, Pipe Bending", 
    "Rolls, Plate Bending (incld Pinch)", "Rolls, Power Tank Turning", "Rolls, Straightening", 
    "Rolls, Turks Head", "Routers", "Sand Blasts Machines", "Saw Blades", "Saws", 
    "Saws, Abrasive & Friction", "Saws, Band, Horizontal", "Saws, Band, Horizontal, Dual Column", 
    "Saws, Band, Vertical", "Saws, Circular Cold", "Saws, Cold & Carbide", "Saws, Cut-Off", "Saws, Plate", 
    "Scale, Crane", "Scales", "Scales, Floor", "Scales, Platform", "Scrap Choppers", "Scrap Shears", 
    "Scrap Winders", "Scrubbers", "Separators", "Servo Motors", "Shapers", "Shapers, Vertical", 
    "Shears, Alligator", "Shears, Angle & Bar", "Shears, Bar & Billet", "Shears, Circle", "Shears, Conveyor", 
    "Shears, Cropping", "Shears, Down-Cut", "Shears, Flying", "Shears, Hand", "Shears, High Speed", 
    "Shears, Hydraulic", "Shears, Hydraulic, Guillotine", "Shears, Mechanical", "Shears, Plate", 
    "Shears, Power Squaring (Ga)", "Shears, Power Squaring (In)", "Shears, Rotary, Incl Ring & Circle", 
    "Shears, Upcut", "Sheet Metal Forming Machinery", "Shot Blast Cleaning (Peening / Airless)", 
    "Shot Blast Cleaning (Peening / Airless), Spinner Hanger", "Shot Blast Cleaning (Peening / Airless), Tumblast", 
    "Shredders", "Shrink Tunnels", "Skid Loaders", "Slear Lines", "Slitters & Slitting Lines", "Slotters", 
    "Speed Reducers", "Spindles", "Stackers", "Stands", "Starters, Motor", "Steady Rests", "Storage Systems", 
    "Straighteners", "Straighteners, Contour", "Straighteners, Flat & Shape", "Straighteners, Rod", 
    "Straighteners, Sheet & Strip", "Straighteners, Tube & Bar", "Strapping Machines", 
    "Structural Steel Burning Systems", "Sump Suckers", "Superfinishers", "Surface Plates", "Swagers", 
    "Tables, Accumulating", "Tables, Acorn", "Tables, Box & Drill", "Tables, Drafting", "Tables, Elevating", 
    "Tables, Floor & Layout Plates", "Tables, Granite", "Tables, Rotary", "Tables, T-Slotted", 
    "Tables, Welding", "Tanks", "Tanks, Steel", "Tap Extractors", "Taper Attachments", "Tappers", 
    "Test Benches", "Testers, Analyzers", "Testers, Armature", "Testers, Circuit Board", "Testers, Hardness", 
    "Testers, Miscellaneous", "Testers, Moisture", "Testers, Quality Control", "Testers, Tensile & Compression", 
    "Thread Rollers", "Threaders, Receding Die Head", "Threaders, Stationary Die Head", "Threading Machines", 
    "Threading Machines, Bolt Threaders", "Tippers", "Tool Bits", "Tool Carts", "Tool Holders", "Tool Posts", 
    "Tool Presetting Machines", "Tool Room Equipment", "Tooling & Accessories (Other)", "Tooling Storage & Cabinets", 
    "Tractors & Trailers", "Transfer Machines", "Transformers", "Trash Compactors", "Trimmers", "Trucks", 
    "Trucks, Lift Gas Or Electric", "Trucks, Lift, Attachment & Accessories", 
    "Tube End Finishing & Chamfering Machinery", "Tube End Forming Machinery", "Tube Expanders", 
    "Tube Inspection Equipment", "Tube Machinery, Cut Off", "Tube Machinery, Flangers", 
    "Tube Machinery, Miscellaneous", "Tube Machinery, Spinners", "Tube Mills", "Tuggers", 
    "Tumbling Barrels", "Tumbling Equipment", "Turners", "Turning Centers", "Turnstiles", 
    "Ultrasonic Vapor Degreasers", "Uncoilers", "Upenders / Down-Enders", "Upsetters", "Vacuum Cleaners", 
    "Vacuum Coaters", "Vacuum Receivers", "Vacuum Tanks", "Variable Speed Drives", "Vertical Baler", 
    "Vibratory Machines", "Vises", "Wash & Spray Booths", "Washers", "Washing Equipment", 
    "Water Treatment Equipment", "Waterjet Cutters", "Welders, Arc", "Welders, Band Saw Blade", "Welders, Butt", 
    "Welders, Laser", "Welders, Longitudinal, Seam", "Welders, Mig", "Welders, Miscellaneous", "Welders, Orbital", 
    "Welders, Pipe & Tube", "Welders, Plasma", "Welders, Rotary Table Type", "Welders, Seam", "Welders, Spot", 
    "Welders, Spot, Rocker Arm", "Welders, Stud", "Welders, Tig", "Welders, Wire Feed", "Welding Manipulators", 
    "Welding Positioners", "Welding Torches", "Welding Turning Rolls", "Welding, Accessories", "Welding, Positioner", 
    "Welding, Tools", "Wheelabrators", "Winches", "Wire Benders", "Wire Coilers", "Wire Cut & Strip", "Wire Dereelers", 
    "Wire Descaler", "Wire Drawers", "Wire Feeders", "Wire Forming (and Four Slides)", "Wire In-Line Drawers", 
    "Wire Machinery (Other)", "Wire Machinery, Forming", "Wire Spring Coilers", "Wire Spring Grinders", 
    "Wire Straighteners & Cut-Offs", "Wire Strippers", "Wire Winders", "Woodworking Machinery", 
    "Woodworking Planers", "Woodworking Routers", "Woodworking Sanders", "Woodworking Saws", "Woodworking Saws, Table", 
    "Work Benches", "Wrapping Machines", "Wrenches"
];

  return (
  <div>
    <Header/>
    <Container fluid className='main-container pt-2'>
      <Container fluid className='py-3'>
        <Form.Select aria-label="Select type" onChange={e => setType(e.target.value)}>
          <option selected disabled>Select a type</option>
          {types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </Form.Select>
      </Container>

      {type === "" ? (
         !isLoading ? (
          <div style={{height: '45vh'}}>
            <h6>Please select a type.</h6>
          </div>
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
      <Footer />
    </div>
  );
}

export default ByType;

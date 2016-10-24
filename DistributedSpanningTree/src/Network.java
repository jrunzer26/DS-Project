import org.graphstream.graph.*;
import org.graphstream.graph.implementations.MultiGraph;

public class Network {
	public void start() {
		System.out.println("Hello");
		System.setProperty("org.graphstream.ui.renderer", "org.graphstream.ui.j2dviewer.J2DGraphRenderer");
		Graph graph = new MultiGraph("Turotial 1");
		graph.addNode("A");
		graph.addNode("B");
		Edge ab = graph.addEdge("AB", "A", "B");
		graph.display();
		graph.addEdge("AB2", "A", "B");
		try {
			Thread.sleep(1000);
		} catch (Exception e) {
			e.printStackTrace();
		}
		Node c = graph.addNode("C");
		Edge ab3 = graph.addEdge("AB3",  "A", "B");
		ab.addAttribute("ui.style", "fill-color: rgb(0,100,255);");
		//c.addAttribute("ui.style", "fill-color: rgb(255, 255, 255);");
		Edge ac = graph.addEdge("AC", "A", "C");
		//ac.addAttribute("ui.style", "fill-color: rgb(0,100,255);");
		
	}
}

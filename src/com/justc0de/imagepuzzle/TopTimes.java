package com.justc0de.imagepuzzle;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
		    throws ServletException, IOException {
		try {
			response.setContentType("text/html");
			PrintWriter out = response.getWriter();

			// get latest times from storage then write back to requesting doc
			out.write("Results");

		    System.out.println("server debug, TopTimes servlet called");
		} catch (IOException io) {
			io.printStackTrace();
		}
	}
}
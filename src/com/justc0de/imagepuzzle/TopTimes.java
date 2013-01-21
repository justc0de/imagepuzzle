package com.justc0de.imagepuzzle;

import java.io.IOException;
import javax.servlet.http.*;

@SuppressWarnings("serial")
public class TopTimes extends HttpServlet {
	public void doGet(HttpServletRequest req, HttpServletResponse resp)
			throws IOException {
		resp.setContentType("text/plain");
		resp.setHeader("Access-Control-Allow-Origin", "*");
		resp.getWriter().println("In Servlet");
	}
}

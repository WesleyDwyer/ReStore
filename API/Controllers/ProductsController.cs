using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController : BaseApiController
    {
        private StoreContext _context;
        public ProductsController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            var products =await _context.Products.ToListAsync();

            return Ok(products);
        }

        [HttpGet("{Id}")] //api/Products/2
        public async Task<ActionResult<Product>> GetProduct(int Id)
        {
            var product = await _context.Products.FindAsync(Id);

            if(product == null)
                return NotFound();

            return Ok(product);
            // return _context.Products.Find(id);
        }
    }
}